import zod from 'zod';
import validator from 'validator';
import prisma from '@prisma';
import { InspectorType } from '@types';
import {
  ProjectStageScheduleInterruptionInputCreate,
  ProjectStageScheduleInterruptionInputUpdate,
} from 'src/codegen/graphql';

export const inspectors: InspectorType<
  ProjectStageScheduleInterruptionInputCreate,
  ProjectStageScheduleInterruptionInputUpdate
> = {
  get base() {
    return zod
      .object({
        projectStageScheduleId: zod.string().superRefine(async (projectStageScheduleId, { addIssue }) => {
          const projectStageScheduleIdIsInvalid = !(await prisma.projectStageSchedule.exists({
            id: projectStageScheduleId,
          }));
          if (projectStageScheduleIdIsInvalid) {
            addIssue({
              code: 'custom',
              message: 'شناسه زمانبندی معتبر نیست',
            });
            return zod.NEVER;
          }
        }),
        reason: zod.string().superRefine(async (reason, { addIssue }) => {
          if (!validator.isLength(reason, { min: 1, max: 255 })) {
            addIssue({
              code: 'custom',
              message: 'حداقل طول دلیل وقفه 1 کاراکتر و حداکثر 255 کاراکتر می باشد',
            });
            return zod.NEVER;
          }
        }),
        dateStart: zod.date(),
        dateEnd: zod.date(),
      })
      .strict();
  },
  get create() {
    return this.base.superRefine(async (args, { addIssue }) => {
      if (args.dateStart > args.dateEnd) {
        addIssue({
          code: 'custom',
          message: 'تاریخ پایان وقفه نمیتواند قبل از تاریخ شروع وقفه باشد',
          path: ['dateEnd'],
        });
        return zod.NEVER;
      }
      const schedule = await prisma.projectStageSchedule.findUniqueOrThrow({
        where: {
          id: args.projectStageScheduleId,
        },
        include: {
          previous: true,
          interruptions: true,
        },
      });
      for (const interruption of schedule.interruptions) {
        if (interruption.dateStart < args.dateStart && interruption.dateEnd > args.dateStart) {
          addIssue({
            code: 'custom',
            message: 'تاریخ وقفه با وقفه دیگری تداخل دارد',
            path: ['dateStart'],
          });
          return zod.NEVER;
        }
        if (interruption.dateStart < args.dateEnd && interruption.dateEnd > args.dateEnd) {
          addIssue({
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
        addIssue({
          code: 'custom',
          message: 'تاریخ شروع وقفه نمیتواند قبل از تاریخ شروع زمانبندی باشد',
          path: ['dateStart'],
        });
        return zod.NEVER;
      }
    });
  },
  get update() {
    return zod
      .object({
        id: zod.string().superRefine(async (id, { addIssue }) => {
          const interruptionIdIsInvalid = !(await prisma.projectStageScheduleInterruption.exists({
            id,
          }));
          if (interruptionIdIsInvalid) {
            addIssue({
              code: 'custom',
              message: 'شناسه وقفه معتبر نیست',
            });
            return zod.NEVER;
          }
        }),
        data: this.base.partial(),
      })
      .strict()
      .superRefine(async (args, { addIssue }) => {
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
            addIssue({
              code: 'custom',
              message: 'تاریخ پایان وقفه نمیتواند قبل از تاریخ شروع وقفه باشد',
              path: ['dateEnd'],
            });
            return zod.NEVER;
          }
        }
        if (!args.data.dateStart) return;
        const schedule = await prisma.projectStageScheduleInterruption
          .findUniqueOrThrow({
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
        if (!dateStart || !dateEnd) return;
        for (const interruption of schedule.interruptions) {
          if (interruption.dateStart < dateStart && interruption.dateEnd > dateStart) {
            addIssue({
              code: 'custom',
              message: 'تاریخ وقفه با وقفه دیگری تداخل دارد',
              path: ['dateStart'],
            });
            return zod.NEVER;
          }
          if (interruption.dateStart < dateEnd && interruption.dateEnd > dateEnd) {
            addIssue({
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
          addIssue({
            code: 'custom',
            message: 'تاریخ شروع وقفه نمیتواند قبل از تاریخ شروع زمانبندی باشد',
            path: ['dateStart'],
          });
          return zod.NEVER;
        }
      });
  },
  get delete() {
    return zod
      .object({
        id: zod.string().superRefine(async (id, { addIssue }) => {
          const interruptionIdIsInvalid = !(await prisma.projectStageScheduleInterruption.exists({
            id,
          }));
          if (interruptionIdIsInvalid) {
            addIssue({
              code: 'custom',
              message: 'شناسه وقفه معتبر نیست',
            });
            return zod.NEVER;
          }
        }),
      })
      .strict();
  },
};

export default inspectors;
