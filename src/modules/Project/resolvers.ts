import controllers from '@controllers';
import prisma from '@prisma';
import { ProjectModule } from './codegen/module-types';

export const resolvers: ProjectModule.Resolvers = {
  Client: {
    projects: async (parent) => {
      return (
        await prisma.client.findUniqueOrThrow({
          where: {
            id: parent.id,
          },
          include: {
            projects: {
              include: {
                client: true,
              },
            },
          },
        })
      ).projects;
    },
  },
  Project: {
    client: async (parent) => {
      return await prisma.project
        .findUniqueOrThrow({
          where: {
            id: parent.id,
          },
        })
        .client();
    },
  },
  Query: {
    project: async (_, { id }) => {
      return await prisma.project.findUnique({
        where: {
          id,
        },
        include: {
          client: true,
        },
      });
    },
    projects: async () => {
      return await prisma.project.findMany({
        include: {
          client: true,
        },
      });
    },
  },
  Mutation: {
    projectCreate: async (_, { input }) => {
      return await controllers['Project'].create(input);
    },
    projectUpdate: async (_, { id, input }) => {
      return await controllers['Project'].update(id, input);
    },
    projectDelete: async (_, { id }) => {
      return await controllers['Project'].delete(id);
    },
  },
};
