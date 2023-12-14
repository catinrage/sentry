import { prisma } from '@providers';
import { ProjectStageModule } from './codegen/module-types';
import { ProjectStageService } from './service';

export const resolvers: ProjectStageModule.Resolvers = {
  Project: {
    stages: async (parent) => {
      const stages = (
        await prisma.project.findUniqueOrThrow({
          where: {
            id: parent.id,
          },
          include: {
            stages: {
              include: {
                project: {
                  include: { client: true },
                },
                defaultMetadata: true,
              },
            },
          },
        })
      ).stages;
      return stages;
    },
  },
  ProjectStage: {
    project: async (parent) => {
      const project = (
        await prisma.projectStage.findUniqueOrThrow({
          where: {
            id: parent.id,
          },
          include: {
            project: {
              include: { client: true },
            },
          },
        })
      ).project;
      return project;
    },
  },
  Mutation: {
    projectStageCreate: async (_, { input }) => {
      const projectStage = await ProjectStageService.create(input);
      return projectStage;
    },
    projectStageUpdate: async (_, { id, input }) => {
      const projectStage = await ProjectStageService.update(id, input);
      return projectStage;
    },
    projectStageDelete: async (_, { id }) => {
      const projectStage = await ProjectStageService.delete(id);
      return projectStage;
    },
    projectReorderStages: async (_, { projectId }) => {
      const project = await ProjectStageService.reOrderStages(projectId);
      return project;
    },
  },
};
