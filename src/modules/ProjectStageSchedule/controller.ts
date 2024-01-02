import prisma from '@prisma';
import { ControllerType } from '@types';
import { Inspectors } from '@inspectors';
import { ProjectStageScheduleInputCreate, ProjectStageScheduleInputUpdate } from 'src/codegen/graphql';
import { Prisma } from '@prisma/client';

export class ProjectStageScheduleController implements ControllerType {
  async create(data: ProjectStageScheduleInputCreate) {
    return await Inspectors.get('ProjectStageSchedule')
      .at('create')
      .execute(data, async () => {
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
        return await prisma.projectStageSchedule.update({
          where: {
            id: projectStageSchedule.id,
          },
          data: {
            dateEndEstimated: await this.estimateDateEnd(projectStageSchedule.id),
          },
        });
      });
  }

  async update(projectStageScheduleId: string, data: ProjectStageScheduleInputUpdate) {
    return await Inspectors.get('ProjectStageSchedule')
      .at('update')
      .execute({ id: projectStageScheduleId, data }, async () => {
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
          const newDateEndEstimated = await this.estimateDateEnd(schedule.id);
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

        return projectStageSchedule;
      });
  }

  async delete(projectStageScheduleId: string) {
    return await Inspectors.get('ProjectStageSchedule')
      .at('delete')
      .execute({ id: projectStageScheduleId }, async () => {
        return await prisma.projectStageSchedule.delete({
          where: {
            id: projectStageScheduleId,
          },
        });
      });
  }

  async estimateDateEnd(projectStageScheduleId: string): Promise<Date> {
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
}
