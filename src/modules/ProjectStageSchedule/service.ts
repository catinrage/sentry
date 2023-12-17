import { prisma } from '@providers';
import { errors } from '@helpers';
import type { Prisma, PrismaClient } from '@prisma/client';
import {
  MutationResponse,
  ProjectStageScheduleInputCreate,
  ProjectStageScheduleInputUpdate,
} from 'src/codegen/graphql';
import {
  validateProjectStageScheduleCreate,
  validateProjectStageScheduleUpdate,
  validateProjectStageScheduleDelete,
} from './validator';

export class ProjectStageScheduleService {
  static async create(data: ProjectStageScheduleInputCreate): Promise<MutationResponse> {
    try {
      await validateProjectStageScheduleCreate.parseAsync({ ...data });
      const projectStageSchedule = await prisma.$transaction(async (prisma) => {
        const metadata = await prisma.projectStageScheduleMetadata.create({
          data: data.metadata,
        });
        let previousPath = {};
        if (data.previousId) {
          previousPath = {
            previous: {
              connect: {
                id: data.previousId,
              },
            },
          };
        }
        const projectStageSchedule = await prisma.projectStageSchedule.create({
          data: {
            dateStartFixed: data.dateStartFixed,
            machine: {
              connect: {
                id: data.machineId,
              },
            },
            stage: {
              connect: {
                id: data.stageId,
              },
            },
            metadata: {
              connect: {
                id: metadata.id,
              },
            },
            ...previousPath,
            quantity: data.quantity,
            dateEndEstimated: new Date().toISOString(),
          },
        });

        return projectStageSchedule;
      });
      const updatedProjectStageSchedule = await prisma.projectStageSchedule.update({
        where: {
          id: projectStageSchedule.id,
        },
        data: {
          dateEndEstimated: await this.estimateDateEnd(projectStageSchedule.id),
        },
      });
      return {
        id: projectStageSchedule.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  // CARE: we must check upon updating, all interruption still remain in the bound of the schedule, and also check that schedules don't interfere | while updating it may have one
  // of previousId or startDate, if it has one of them the other one must be set to null in the database, because it is not possible to have both of them at the same time
  // must recalculate dateEndEstimated after updating
  static async update(
    projectStageScheduleId: string,
    data: ProjectStageScheduleInputUpdate,
  ): Promise<MutationResponse> {
    try {
      await validateProjectStageScheduleUpdate.parseAsync({ id: projectStageScheduleId, data });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let startPoint: { dateStartFixed?: any; previousId?: string | null } = {};
      if (data.dateStartFixed) {
        startPoint = {
          dateStartFixed: data.dateStartFixed,
          previousId: null,
        };
      } else if (data.previousId) {
        startPoint = {
          previousId: data.previousId,
          dateStartFixed: null,
        };
      }

      const projectStageSchedule = await prisma.projectStageSchedule.update({
        where: {
          id: projectStageScheduleId,
        },
        data: {
          machineId: data.machineId,
          quantity: data.quantity,
          state: data.state,
          ...startPoint,
          metadata: {
            update: data.metadata,
          },
        },
        include: {
          next: true,
        },
      });

      let schedule: Prisma.ProjectStageScheduleGetPayload<{
        include: {
          next: true;
        };
      }> | null = projectStageSchedule;

      while (schedule) {
        const newDateEndEstimated = await ProjectStageScheduleService.estimateDateEnd(schedule.id);
        await prisma.projectStageSchedule.update({
          where: {
            id: schedule.id,
          },
          data: {
            dateEndEstimated: newDateEndEstimated,
          },
        });
        if (schedule.next) {
          schedule = await prisma.projectStageSchedule.findUnique({
            where: {
              id: schedule.next?.id,
            },
            include: {
              next: true,
            },
          });
        } else {
          schedule = null;
        }
      }
      return {
        id: projectStageSchedule.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async delete(projectStageScheduleId: string): Promise<MutationResponse> {
    try {
      await validateProjectStageScheduleDelete.parseAsync({ id: projectStageScheduleId });
      const schedule = await prisma.$transaction(async (prisma) => {
        const schedule = await prisma.projectStageSchedule.delete({
          where: {
            id: projectStageScheduleId,
          },
          include: {
            next: {
              include: {
                next: true,
              },
            },
          },
        });
        if (schedule?.next) {
          const nextSchedule: Prisma.ProjectStageScheduleGetPayload<{
            include: {
              next: true;
            };
          }> | null = await prisma.projectStageSchedule.update({
            where: {
              id: schedule.next.id,
            },
            data: {
              previousId: schedule.previousId,
              dateStartFixed: schedule.dateStartFixed,
            },
            include: {
              next: true,
            },
          });
        }
        return schedule;
      });
      let nextSchedule = schedule.next;
      while (nextSchedule) {
        const newDateEndEstimated = await ProjectStageScheduleService.estimateDateEnd(nextSchedule.id);
        await prisma.projectStageSchedule.update({
          where: {
            id: nextSchedule.id,
          },
          data: {
            dateEndEstimated: newDateEndEstimated,
          },
        });
        if (nextSchedule.next) {
          nextSchedule = await prisma.projectStageSchedule.findUnique({
            where: {
              id: nextSchedule.next?.id,
            },
            include: {
              next: true,
            },
          });
        } else {
          nextSchedule = null;
        }
      }
      return {
        id: schedule.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async markAsCompleted(projectStageScheduleId: string, dateEnd: Date): Promise<MutationResponse> {
    try {
      // TODO: some checking before marking as completed, such as if previous schedule on this machine is completed or not, for finding prev project you can sort schedules by estimated end date (use validation)
      // only a project that is in progress can be completed
      const schedule = await prisma.projectStageSchedule.update({
        where: {
          id: projectStageScheduleId,
        },
        data: {
          dateEndActual: dateEnd,
          state: 'COMPLETED',
        },
      });
      return {
        id: schedule.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async markAsInProgress(projectStageScheduleId: string): Promise<MutationResponse> {
    // TODO: check if any other schedule on the this machine is already in progress
    try {
      const schedule = await prisma.projectStageSchedule.update({
        where: {
          id: projectStageScheduleId,
        },
        data: {
          state: 'IN_PROGRESS',
        },
      });
      return {
        id: schedule.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async markAsPaused(projectStageScheduleId: string): Promise<MutationResponse> {
    // TODO: only a project that is in progress can be pause
    try {
      const schedule = await prisma.projectStageSchedule.update({
        where: {
          id: projectStageScheduleId,
        },
        data: {
          state: 'PAUSED',
        },
      });
      return {
        id: schedule.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async estimateDateEnd(projectStageScheduleId: string): Promise<Date> {
    const schedule = await prisma.projectStageSchedule.findUniqueOrThrow({
      where: {
        id: projectStageScheduleId,
      },
      include: {
        metadata: true,
        interruptions: true,
        previous: true,
      },
    });

    const { metadata, interruptions } = schedule;

    const interruptionDurationInMinutes = interruptions.reduce((acc, interruption) => {
      return (
        acc +
        (new Date(interruption.dateEnd).getTime() - new Date(interruption.dateStart).getTime()) / 1000 / 60
      );
    }, 0);

    if (!metadata) return new Date();

    let dateStart: Date = schedule.dateStartFixed || new Date();
    if (schedule.previous) {
      dateStart = schedule.previous.dateEndActual || schedule.previous.dateEndEstimated;
    }

    // NOTE: formula for calculating schedule duration:
    // durationSetup + ((durationPreparation + durationExecution) * (quantity / numberOfOutputParts)) / efficiencyEstimated
    const scheduleDurationInMinutes =
      metadata.durationSetup +
      ((metadata.durationPreparation + metadata.durationExecution) *
        (schedule.quantity / metadata.numberOfOutputParts)) /
        metadata.efficiencyEstimated +
      interruptionDurationInMinutes;

    if (schedule.state === 'COMPLETED') {
      return schedule.dateEndActual || new Date();
    }

    return new Date(dateStart.getTime() + scheduleDurationInMinutes * 60 * 1000);
  }

  static async exists(where: Prisma.ProjectStageScheduleWhereUniqueInput): Promise<boolean> {
    const projectStage = await prisma.projectStageSchedule.findUnique({
      where,
    });
    return !!projectStage;
  }

  static async isPending(projectStageScheduleId: string): Promise<boolean> {
    const schedule = await prisma.projectStageSchedule.findUnique({
      where: {
        id: projectStageScheduleId,
      },
    });
    return !!schedule && schedule?.state === 'PENDING';
  }

  static async isInProgress(projectStageScheduleId: string): Promise<boolean> {
    const schedule = await prisma.projectStageSchedule.findUnique({
      where: {
        id: projectStageScheduleId,
      },
    });
    return !!schedule && schedule?.state === 'IN_PROGRESS';
  }

  static async isCompleted(projectStageScheduleId: string): Promise<boolean> {
    const schedule = await prisma.projectStageSchedule.findUnique({
      where: {
        id: projectStageScheduleId,
      },
    });
    return !!schedule && schedule?.state === 'COMPLETED';
  }

  static async next(
    projectStageScheduleId: string,
  ): Promise<Prisma.ProjectStageScheduleGetPayload<false> | null> {
    const nextProjectStageSchedule = await prisma.projectStageSchedule
      .findUnique({
        where: {
          id: projectStageScheduleId,
        },
      })
      .next();
    return nextProjectStageSchedule;
  }
}
