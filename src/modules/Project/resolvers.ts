import { prisma } from '@providers';
import { ProjectModule } from './codegen/module-types';
import { ProjectService } from './service';

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
      return await ProjectService.create(input);
    },
    projectUpdate: async (_, { id, input }) => {
      return await ProjectService.update(id, input);
    },
    projectDelete: async (_, { id }) => {
      return await ProjectService.delete(id);
    },
  },
};
