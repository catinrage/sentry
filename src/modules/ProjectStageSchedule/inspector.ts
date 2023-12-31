import zod from 'zod';
import prisma from '@prisma';
import { InspectorType } from '@types';
import { ProjectStageScheduleInputCreate, ProjectStageScheduleInputUpdate } from 'src/codegen/graphql';
import { ProjectStageScheduleStateEnum } from '@prisma/client';
import projectStageScheduleMetadata from '../../modules/ProjectStageScheduleMetadata/inspector';

export const inspectors: InspectorType<ProjectStageScheduleInputCreate, ProjectStageScheduleInputUpdate> = {
  get base() {
    return zod
      .object({
        machineId: zod.string().superRefine(async (machineId, { addIssue }) => {
          const machineIdIsInvalid = !(await prisma.machine.exists({
            id: machineId,
          }));
          if (machineIdIsInvalid) {
            addIssue({
              code: 'custom',
              message: 'شناسه ماشین معتبر نیست',
            });
            return zod.NEVER;
          }
        }),
        stageId: zod.string().superRefine(async (stageId, { addIssue }) => {
          const stageIdIsInvalid = !(await prisma.projectStage.exists({
            id: stageId,
          }));
          if (stageIdIsInvalid) {
            addIssue({
              code: 'custom',
              message: 'شناسه مرحله معتبر نیست',
            });
            return zod.NEVER;
          }
        }),
        quantity: zod.number().superRefine(async (quantity, { addIssue }) => {
          if (quantity < 1) {
            addIssue({
              code: 'custom',
              message: 'حداقل تعداد برای زمانبندی 1 عدد می باشد',
            });
            return zod.NEVER;
          }
        }),
        state: zod
          .nativeEnum(ProjectStageScheduleStateEnum, {
            errorMap: () => ({ message: 'وضعیت زمانبندی معتبر نیست' }),
          })
          .optional(),
        dateStartFixed: zod.date().optional(),
        previousId: zod
          .string()
          .optional()
          .superRefine(async (previousId, { addIssue }) => {
            const previousIdIsInvalid = !(await prisma.projectStageSchedule.exists({
              id: previousId,
            }));
            if (previousIdIsInvalid) {
              addIssue({
                code: 'custom',
                message: 'شناسه زمانبندی قبلی معتبر نیست',
              });
              return zod.NEVER;
            }
          }),
        metadata: projectStageScheduleMetadata.create,
      })
      .strict();
  },
  get create() {
    return this.base.superRefine(async (args, { addIssue }) => {
      if (args.dateStartFixed && args.previousId) {
        addIssue({
          code: 'custom',
          message: 'انتخاب همزمان تاریخ شروع و زمانبندی قبلی ممکن نیست',
          path: args.dateStartFixed ? ['dateStartFixed'] : ['previousId'],
        });
        return zod.NEVER;
      }
      if (!args.dateStartFixed && !args.previousId) {
        addIssue({
          code: 'custom',
          message: 'یکی از مقادیر تاریخ شروع و یا زمانبندی قبلی باید انتخاب شود',
          path: ['dateStartFixed'],
        });
        addIssue({
          code: 'custom',
          message: 'یکی از مقادیر تاریخ شروع و یا زمانبندی قبلی باید انتخاب شود',
          path: ['previousId'],
        });
        return zod.NEVER;
      }
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
        addIssue({
          code: 'custom',
          message: `تعداد قطعات زمانبندی نشده برای این مرحله ${remainingPartsForThisStage} عدد می باشد`,
          path: ['quantity'],
        });
        return zod.NEVER;
      }
    });
  },
  get update() {
    return zod
      .object({
        id: zod.string().superRefine(async (id, { addIssue }) => {
          const idIsInvalid = !(await prisma.projectStageSchedule.exists({
            id,
          }));
          if (idIsInvalid) {
            addIssue({
              code: 'custom',
              message: 'شناسه زمانبندی معتبر نیست',
            });
            return zod.NEVER;
          }
        }),
        data: this.base
          .extend({
            metadata: projectStageScheduleMetadata.create.optional(),
          })
          .omit({
            stageId: true,
          })
          .superRefine(async (args, { addIssue }) => {
            if (args.dateStartFixed && args.previousId) {
              addIssue({
                code: 'custom',
                message: 'انتخاب همزمان تاریخ شروع و زمانبندی قبلی ممکن نیست',
                path: args.dateStartFixed ? ['dateStartFixed'] : ['previousId'],
              });
              return zod.NEVER;
            }
          }),
      })
      .strict()
      .superRefine(async (args, { addIssue }) => {
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
            .findUniqueOrThrow({
              where: {
                id: args.data.stageId || projectStage.id,
              },
            })
            .project();

          const totalPartsForThisStage = project.quantity;
          const remainingPartsForThisStage = totalPartsForThisStage - alreadyScheduledPartsForThisStage;

          if (remainingPartsForThisStage < args.data.quantity) {
            addIssue({
              code: 'custom',
              message: `تعداد قطعات زمانبندی نشده برای این مرحله ${remainingPartsForThisStage} عدد می باشد`,
              path: ['quantity'],
            });
            return zod.NEVER;
          }

          if (args.data.dateStartFixed || args.data.previousId) {
            const schedule = await prisma.projectStageSchedule.findFirstOrThrow({
              where: {
                id: args.id,
              },
              include: {
                previous: true,
                interruptions: true,
              },
            });
            if (schedule.state === 'COMPLETED' || schedule.state === 'IN_PROGRESS') {
              addIssue({
                code: 'custom',
                message: 'امکان تغییر زمان شروع برای زمانبندی های در حال انجام یا تمام شده وجود ندارد',
                path: ['dateStartFixed'],
              });
              return zod.NEVER;
            }
          }
        }
      });
  },
  get delete() {
    return zod
      .object({
        id: zod.string().superRefine(async (id, { addIssue }) => {
          const idIsInvalid = !(await prisma.projectStageSchedule.exists({
            id,
          }));
          if (idIsInvalid) {
            addIssue({
              code: 'custom',
              message: 'شناسه زمانبندی معتبر نیست',
            });
            return zod.NEVER;
          }
        }),
      })
      .strict();
  },
  extends: {
    ProjectStage: {
      delete: zod
        .object({
          id: zod.string().superRefine(async (id, { addIssue }) => {
            const scheduleExists = await prisma.projectStageSchedule.findFirst({
              where: {
                stageId: id,
              },
            });
            if (scheduleExists) {
              addIssue({
                code: 'custom',
                message: 'نمیتوانید این مرحله را حذف کنید, حداقل یک زمانبندی برای این مرحله ثبت شده است',
              });
              return zod.NEVER;
            }
          }),
        })
        .strict(),
    },
    Machine: {
      delete: zod
        .object({
          id: zod.string().superRefine(async (id, { addIssue }) => {
            const scheduleExists = await prisma.projectStageSchedule.findFirst({
              where: {
                machineId: id,
              },
            });
            if (scheduleExists) {
              addIssue({
                code: 'custom',
                message: 'نمیتوانید این ماشین را حذف کنید, حداقل یک زمانبندی برای این ماشین ثبت شده است',
              });
              return zod.NEVER;
            }
          }),
        })
        .strict(),
    },
  },
};

export default inspectors;
