import { prisma } from '@providers';
import { errors } from '@helpers';
import type { Prisma } from '@prisma/client';
import { MutationResponse, ProjectStageScheduleInputCreate } from 'src/codegen/graphql';
import { validateProjectStageScheduleCreate } from './validator';

export class ProjectStageScheduleService {
  static async create(data: ProjectStageScheduleInputCreate): Promise<MutationResponse> {
    try {
      await validateProjectStageScheduleCreate.parseAsync({ ...data });
      const projectStageSchedule = await prisma.$transaction(async (prisma) => {
        const metadata = await prisma.projectStageScheduleMetadata.create({
          data: data.metadata,
        });
        const projectStageSchedule = await prisma.projectStageSchedule.create({
          data: {
            dateStart: data.dateStart,
            previous: {
              connect: {
                id: data.previousId,
              },
            },
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
            quantity: data.quantity,
          },
        });
        return projectStageSchedule;
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

  // static async update, we must check upon updating, all interruption still remain in the bound of the schedule, and also check that schedules don't interfere

  // must be cautious with this one, if this one has a next schedule, the next one must be updated and replace its start point (weather it has a startDate or previous schedule), and think of more edge cases
  // static async delete

  static async exists(where: Prisma.ProjectStageScheduleWhereUniqueInput): Promise<boolean> {
    const projectStage = await prisma.projectStageSchedule.findUnique({
      where,
    });
    return !!projectStage;
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
