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
    if (args.dateStart > args.dateEnd) {
      ctx.addIssue({
        code: 'custom',
        message: 'تاریخ پایان وقفه نمیتواند قبل از تاریخ شروع وقفه باشد',
        path: ['dateEnd'],
      });
      return zod.NEVER;
    }
    const schedule = await prisma.projectStageSchedule.findUnique({
      where: {
        id: args.projectStageScheduleId,
      },
      include: {
        previous: true,
        interruptions: true,
      },
    });
    if (!schedule) return;
    for (const interruption of schedule.interruptions) {
      if (interruption.dateStart < args.dateStart && interruption.dateEnd > args.dateStart) {
        ctx.addIssue({
          code: 'custom',
          message: 'تاریخ وقفه با وقفه دیگری تداخل دارد',
          path: ['dateStart'],
        });
        return zod.NEVER;
      }
      if (interruption.dateStart < args.dateEnd && interruption.dateEnd > args.dateEnd) {
        ctx.addIssue({
          code: 'custom',
          message: 'تاریخ وقفه با وقفه دیگری تداخل دارد',
          path: ['dateEnd'],
        });
        return zod.NEVER;
      }
    }
    const scheduleDateStart =
      schedule.dateStartFixed || schedule.previous?.dateEndActual || schedule.previous?.dateEndEstimated;
    if (!scheduleDateStart) return;
    if (scheduleDateStart > args.dateStart) {
      ctx.addIssue({
        code: 'custom',
        message: 'تاریخ شروع وقفه نمیتواند قبل از تاریخ شروع زمانبندی باشد',
        path: ['dateStart'],
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
    if (args.data.dateStart || args.data.dateEnd) {
      if (dateStart && dateEnd && dateStart > dateEnd) {
        ctx.addIssue({
          code: 'custom',
          message: 'تاریخ پایان وقفه نمیتواند قبل از تاریخ شروع وقفه باشد',
          path: ['dateEnd'],
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
          interruptions: true,
        },
      });
    if (!schedule) return;
    if (!dateStart || !dateEnd) return;
    for (const interruption of schedule.interruptions) {
      if (interruption.dateStart < dateStart && interruption.dateEnd > dateStart) {
        ctx.addIssue({
          code: 'custom',
          message: 'تاریخ وقفه با وقفه دیگری تداخل دارد',
          path: ['dateStart'],
        });
        return zod.NEVER;
      }
      if (interruption.dateStart < dateEnd && interruption.dateEnd > dateEnd) {
        ctx.addIssue({
          code: 'custom',
          message: 'تاریخ وقفه با وقفه دیگری تداخل دارد',
          path: ['dateEnd'],
        });
        return zod.NEVER;
      }
    }
    const scheduleDateStart =
      schedule.dateStartFixed || schedule.previous?.dateEndActual || schedule.previous?.dateEndEstimated;
    if (!scheduleDateStart) return;
    if (scheduleDateStart > args.data.dateStart) {
      ctx.addIssue({
        code: 'custom',
        message: 'تاریخ شروع وقفه نمیتواند قبل از تاریخ شروع زمانبندی باشد',
        path: ['dateStart'],
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
