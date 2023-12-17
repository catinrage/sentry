import { z as zod } from 'zod';
import { prisma } from '@providers';
import { ProjectStageScheduleService, MachineService, ProjectStageService } from '@services';
import {
  validateProjectStageScheduleMetadataCreate,
  validateProjectStageScheduleMetadataUpdate,
} from '../ProjectStageScheduleMetadata/validator';
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
  dateStartFixed: zod.date().optional(),
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
        message: 'در حال حاضر یک زمانبندی بعدی برای زمانبندی قبلی انتخاب شده وجود دارد',
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
    if (!args.dateStartFixed && !args.previousId) {
      ctx.addIssue({
        code: 'custom',
        message: 'یکی از مقادیر تاریخ شروع و یا زمانبندی قبلی باید انتخاب شود',
        path: ['dateStartFixed'],
      });
      ctx.addIssue({
        code: 'custom',
        message: 'یکی از مقادیر تاریخ شروع و یا زمانبندی قبلی باید انتخاب شود',
        path: ['previousId'],
      });
    }
    if (args.dateStartFixed && args.previousId) {
      ctx.addIssue({
        code: 'custom',
        message: 'انتخاب همزمان تاریخ شروع و زمانبندی قبلی ممکن نیست',
        path: ['dateStartFixed'],
      });
      ctx.addIssue({
        code: 'custom',
        message: 'انتخاب همزمان تاریخ شروع و زمانبندی قبلی ممکن نیست',
        path: ['previousId'],
      });
    }
  },
);

export const validateProjectStageScheduleUpdate = zod
  .object({
    id: zod.string().refine(
      async (id) => {
        return await ProjectStageScheduleService.exists({
          id,
        });
      },
      {
        message: 'زمانبندی مورد نظر یافت نشد',
      },
    ),
    data: validateProjectStageScheduleBase
      .extend({
        metadata: validateProjectStageScheduleMetadataUpdate,
      })
      .partial()

      .superRefine(async (args, ctx) => {
        if (args.dateStartFixed && args.previousId) {
          ctx.addIssue({
            code: 'custom',
            message: 'انتخاب همزمان تاریخ شروع و زمانبندی قبلی ممکن نیست',
            path: args.dateStartFixed ? ['dateStartFixed'] : ['previousId'],
          });
        }
      }),
  })
  .superRefine(async (args, ctx) => {
    if (args.data.quantity) {
      const projectStage = await prisma.projectStageSchedule
        .findUnique({
          where: {
            id: args.id,
          },
        })
        .stage();
      if (!projectStage) return;
      const alreadyScheduledPartsForThisStage =
        (
          await prisma.projectStageSchedule.aggregate({
            where: {
              stageId: args.data.stageId || projectStage.id,
            },
            _sum: {
              quantity: true,
            },
          })
        )._sum.quantity || 0;
      const project = await prisma.projectStage
        .findUnique({
          where: {
            id: args.data.stageId || projectStage.id,
          },
        })
        .project();
      if (!project) return;

      const totalPartsForThisStage = project.quantity;
      const remainingPartsForThisStage = totalPartsForThisStage - alreadyScheduledPartsForThisStage;

      if (remainingPartsForThisStage < args.data.quantity) {
        ctx.addIssue({
          code: 'custom',
          message: `تعداد قطعات زمانبندی نشده برای این مرحله ${remainingPartsForThisStage} عدد می باشد`,
          path: ['quantity'],
        });
      }
    }
    if (args.data.dateStartFixed || args.data.previousId) {
      if (
        (await ProjectStageScheduleService.isCompleted(args.id)) ||
        (await ProjectStageScheduleService.isInProgress(args.id))
      ) {
        ctx.addIssue({
          code: 'custom',
          message: 'امکان تغییر زمان شروع برای زمانبندی های در حال انجام یا تمام شده وجود ندارد',
          path: ['dateStartFixed'],
        });
      }
    }
  });

export const validateProjectStageScheduleDelete = zod.object({
  id: zod.string().refine(
    async (id) => {
      return await ProjectStageScheduleService.exists({
        id,
      });
    },
    {
      message: 'زمانبندی مورد نظر یافت نشد',
    },
  ),
});
