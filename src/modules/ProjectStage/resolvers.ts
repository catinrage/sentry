import controllers from '@controllers';
import prisma from '@prisma';
import { ProjectStageModule } from './codegen/module-types';

export const resolvers: ProjectStageModule.Resolvers = {
  Project: {
    stages: async (parent) => {
      return await prisma.project
        .findUniqueOrThrow({
          where: {
            id: parent.id,
          },
        })
        .stages({
          include: {
            project: {
              include: { client: true },
            },
            defaultMetadata: true,
          },
        });
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
      const projectStage = await controllers['ProjectStage'].create(input);
      return projectStage;
    },
    projectStageUpdate: async (_, { id, input }) => {
      const projectStage = await controllers['ProjectStage'].update(id, input);
      return projectStage;
    },
    projectStageDelete: async (_, { id }) => {
      const projectStage = await controllers['ProjectStage'].delete(id);
      return projectStage;
    },
  },
};
