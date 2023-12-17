import { z as zod } from 'zod';
import { prisma } from '@providers';
import { ProjectStageScheduleInterruptionService, ProjectStageScheduleService } from '@services';

const validateProjectStageScheduleInterruptionBase = zod.object({
  projectStageScheduleId: zod
    .string()
    .refine(
      async (id) => {
        return await ProjectStageScheduleService.exists({
          id,
        });
      },
      {
        message: 'زمانبندی مورد نظر یافت نشد',
      },
    )
    .refine(
      async (id) => {
        return await ProjectStageScheduleService.isInProgress(id);
      },
      {
        message: 'وقفه فقط برای زمانبندی های در حال انجام قابل اعمال می باشد',
      },
    ),
  reason: zod
    .string()
    .min(1, 'حداقل طول دلیل وقفه 1 کاراکتر می باشد')
    .max(255, 'حداکثر طول دلیل وقفه 255 کاراکتر می باشد'),
  dateStart: zod.date(),
  dateEnd: zod.date(),
});

export const validateProjectStageScheduleInterruptionCreate =
  validateProjectStageScheduleInterruptionBase.superRefine(async (args, ctx) => {
    // FIXME: interruptions can not be interfered with each other (also check in update)
    if (args.dateStart > args.dateEnd) {
      ctx.addIssue({
        code: 'custom',
        message: 'تاریخ پایان وقفه نمیتواند قبل از تاریخ شروع وقفه باشد',
        path: ['interruption', 'dateEnd'],
      });
    }
    const schedule = await prisma.projectStageSchedule.findUnique({
      where: {
        id: args.projectStageScheduleId,
      },
      include: {
        previous: true,
      },
    });
    if (!schedule) return;
    const scheduleDateStart =
      schedule.dateStartFixed || schedule.previous?.dateEndActual || schedule.previous?.dateEndEstimated;
    if (!scheduleDateStart) return;
    if (scheduleDateStart > args.dateStart) {
      ctx.addIssue({
        code: 'custom',
        message: 'تاریخ شروع وقفه نمیتواند قبل از تاریخ شروع زمانبندی باشد',
        path: ['interruption', 'dateStart'],
      });
    }
  });

export const validateProjectStageScheduleInterruptionUpdate = zod
  .object({
    id: zod.string().refine(
      async (id) => {
        return await ProjectStageScheduleInterruptionService.exists({
          id,
        });
      },
      {
        message: 'وقفه مورد نظر یافت نشد',
      },
    ),
    data: validateProjectStageScheduleInterruptionBase.partial(),
  })
  .superRefine(async (args, ctx) => {
    if (args.data.dateStart || args.data.dateEnd) {
      const dateStart =
        args.data.dateStart ||
        (
          await prisma.projectStageScheduleInterruption.findUnique({
            where: {
              id: args.id,
            },
          })
        )?.dateStart;
      const dateEnd =
        args.data.dateEnd ||
        (
          await prisma.projectStageScheduleInterruption.findUnique({
            where: {
              id: args.id,
            },
          })
        )?.dateEnd;
      if (dateStart && dateEnd && dateStart > dateEnd) {
        ctx.addIssue({
          code: 'custom',
          message: 'تاریخ پایان وقفه نمیتواند قبل از تاریخ شروع وقفه باشد',
          path: ['interruption', 'dateEnd'],
        });
      }
    }
    if (!args.data.dateStart) return;
    const schedule = await prisma.projectStageScheduleInterruption
      .findUnique({
        where: {
          id: args.id,
        },
      })
      .schedule({
        include: {
          previous: true,
        },
      });
    if (!schedule) return;
    const scheduleDateStart =
      schedule.dateStartFixed || schedule.previous?.dateEndActual || schedule.previous?.dateEndEstimated;
    if (!scheduleDateStart) return;
    if (scheduleDateStart > args.data.dateStart) {
      ctx.addIssue({
        code: 'custom',
        message: 'تاریخ شروع وقفه نمیتواند قبل از تاریخ شروع زمانبندی باشد',
        path: ['interruption', 'dateStart'],
      });
    }
  });

export const validateProjectStageScheduleInterruptionDelete = zod.object({
  id: zod.string().refine(
    async (id) => {
      return await ProjectStageScheduleInterruptionService.exists({
        id,
      });
    },
    {
      message: 'وقفه مورد نظر یافت نشد',
    },
  ),
});
