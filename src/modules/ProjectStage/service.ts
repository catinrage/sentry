import type { Prisma } from '@prisma/client';
import { prisma } from '@providers';
import { errors } from '@helpers';
import { MutationResponse, ProjectStageInputUpdate, ProjectStageInputCreate } from 'src/codegen/graphql';
import {
  validateProjectStageCreate,
  validateProjectStageDelete,
  validateProjectStageUpdate,
} from './validator';

export class ProjectStageService {
  static async create(data: ProjectStageInputCreate): Promise<MutationResponse> {
    try {
      await validateProjectStageCreate.parseAsync({ ...data });
      const projectStage = await prisma.$transaction(async (prisma) => {
        const lastStage = await prisma.projectStage.findFirst({
          where: {
            projectId: data.projectId,
          },
          orderBy: {
            number: 'desc',
          },
        });
        const lastStageNumber = (lastStage?.number || 0) + 1;
        const defaultMetadata = await prisma.projectStageScheduleMetadata.create({
          data: data.defaultMetadata,
        });
        const projectStage = await prisma.projectStage.create({
          data: {
            title: data.title,
            project: {
              connect: {
                id: data.projectId,
              },
            },
            defaultMetadata: {
              connect: {
                id: defaultMetadata.id,
              },
            },
            number: lastStageNumber,
          },
        });
        return projectStage;
      });
      await ProjectStageService.reOrderStages(data.projectId);
      return {
        id: projectStage.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async update(projectStageId: string, data: ProjectStageInputUpdate): Promise<MutationResponse> {
    try {
      await validateProjectStageUpdate.parseAsync({ id: projectStageId, data });
      const projectStage = await prisma.projectStage.update({
        where: {
          id: projectStageId,
        },
        data: {
          title: data.title,
          defaultMetadata: {
            update: {
              data: data.defaultMetadata,
            },
          },
        },
      });
      return {
        id: projectStage.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async delete(stageId: string): Promise<MutationResponse> {
    try {
      await validateProjectStageDelete.parseAsync({ id: stageId });
      const projectStage = await prisma.projectStage.delete({
        where: {
          id: stageId,
        },
      });
      await ProjectStageService.reOrderStages(projectStage.projectId);
      return {
        id: stageId,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async exists(where: Prisma.ProjectStageWhereUniqueInput): Promise<boolean> {
    const projectStage = await prisma.projectStage.findUnique({
      where,
    });
    return !!projectStage;
  }

  static async hasAnySchedules(projectStageId: string): Promise<boolean> {
    const schedules = await prisma.projectStage
      .findUnique({
        where: {
          id: projectStageId,
        },
      })
      .schedules();
    return (schedules?.length || 0) > 0;
  }

  static async reOrderStages(projectId: string): Promise<MutationResponse> {
    try {
      const projectStages = await prisma.projectStage.findMany({
        where: {
          projectId,
        },
        orderBy: {
          number: 'asc',
        },
      });
      await prisma.$transaction(async (prisma) => {
        const reorderedStages = await Promise.all(
          projectStages.map(async (stage, index) => {
            return await prisma.projectStage.update({
              where: {
                id: stage.id,
              },
              data: {
                number: index + 1,
              },
            });
          }),
        );
        return reorderedStages;
      });
      return {
        id: projectId,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }
}
