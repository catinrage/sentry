import prisma from '@prisma';
import { ControllerType } from '@types';
import { Inspectors } from '@inspectors';
import { ProjectStageInputCreate, ProjectStageInputUpdate } from 'src/codegen/graphql';

export class ProjectStageController implements ControllerType {
  async create(data: ProjectStageInputCreate) {
    return await Inspectors.get('ProjectStage')
      .at('create')
      .execute(data, async () => {
        return await prisma.$transaction(async (prisma) => {
          const lastStage = await prisma.projectStage.findFirst({
            where: {
              projectId: data.projectId,
            },
            orderBy: {
              number: 'desc',
            },
          });
          const latestStageNumber = (lastStage?.number || 0) + 1;
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
              number: latestStageNumber,
            },
          });
          await this.reorder(data.projectId);
          return projectStage;
        });
      });
  }

  async update(projectStageId: string, data: ProjectStageInputUpdate) {
    return await Inspectors.get('ProjectStage')
      .at('update')
      .execute({ id: projectStageId, data }, async () => {
        return await prisma.projectStage.update({
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
      });
  }

  async delete(projectStageId: string) {
    return await Inspectors.get('ProjectStage')
      .at('delete')
      .execute({ id: projectStageId }, async () => {
        return await prisma.projectStage.delete({
          where: {
            id: projectStageId,
          },
        });
      });
  }

  async reorder(projectId: string): Promise<void> {
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
  }
}
