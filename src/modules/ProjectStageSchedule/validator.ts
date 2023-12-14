import { z as zod } from 'zod';
import { prisma } from '@providers';
import { ProjectStageScheduleService, MachineService, ProjectStageService } from '@services';
import { validateProjectStageScheduleMetadataCreate } from '../ProjectStageScheduleMetadata/validator';
import { ProjectStageScheduleStateEnum } from '@prisma/client';

const validateProjectStageScheduleBase = zod.object({
  machineId: zod.string().refine(
    async (machineId) => {
      return await MachineService.exists({
        id: machineId,
      });
    },
    {
      message: 'ماشین مورد نظر یافت نشد',
    },
  ),
  stageId: zod.string().refine(
    async (stageId) => {
      return await ProjectStageService.exists({
        id: stageId,
      });
    },
    {
      message: 'مرحله ی مورد نظر یافت نشد',
    },
  ),
  quantity: zod.number().min(1, 'حداقل تعداد برای زمانبندی 1 عدد می باشد'),
  state: zod
    .nativeEnum(ProjectStageScheduleStateEnum, {
      errorMap: () => ({ message: 'وضعیت زمانبندی معتبر نیست' }),
    })
    .optional(),
  dateStart: zod.date().optional(),
  previousId: zod
    .string()
    .refine(
      async (previousId) => {
        return await ProjectStageScheduleService.exists({
          id: previousId,
        });
      },
      {
        message: 'زمانبندی قبلی معتبر نیست',
      },
    )
    .refine(
      async (previousId) => {
        return !(await ProjectStageScheduleService.next(previousId));
      },
      {
        message: 'در حال حاضر یک زمانبندی بعدی برای این زمانبندی وجود دارد',
      },
    )
    .optional(),
  metadata: validateProjectStageScheduleMetadataCreate,
});

export const validateProjectStageScheduleCreate = validateProjectStageScheduleBase.superRefine(
  async (args, ctx) => {
    const alreadyScheduledPartsForThisStage =
      (
        await prisma.projectStageSchedule.aggregate({
          where: {
            stageId: args.stageId,
          },
          _sum: {
            quantity: true,
          },
        })
      )._sum.quantity || 0;
    const project = await prisma.projectStage
      .findUnique({
        where: {
          id: args.stageId,
        },
      })
      .project();
    if (!project) return;

    const totalPartsForThisStage = project.quantity;
    const remainingPartsForThisStage = totalPartsForThisStage - alreadyScheduledPartsForThisStage;

    if (remainingPartsForThisStage < args.quantity) {
      ctx.addIssue({
        code: 'custom',
        message: `تعداد قطعات زمانبندی نشده برای این مرحله ${remainingPartsForThisStage} عدد می باشد`,
        path: ['quantity'],
      });
    }
    if (!args.dateStart && !args.previousId) {
      ctx.addIssue({
        code: 'custom',
        message: 'تاریخ شروع یا زمانبندی قبلی اجباری می باشد',
        path: ['dateStart'],
      });
    }
    if (args.dateStart && args.previousId) {
      ctx.addIssue({
        code: 'custom',
        message: 'هردوی تاریخ شروع و زمانبندی قبلی قابل انتخاب نیستند',
        path: ['dateStart'],
      });
    }
  },
);
