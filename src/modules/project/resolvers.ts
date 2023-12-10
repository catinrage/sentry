import { ProjectModule } from './codegen/module-types';
import { ProjectService } from './service';
import { prisma } from '@providers';

export const resolvers: ProjectModule.Resolvers = {
  Client: {
    projects: async (root) => {
      return (
        await prisma.client.findUniqueOrThrow({
          where: {
            id: root.id,
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
  Query: {
    project: async (root, data) => {
      return await prisma.project.findUnique({
        where: {
          id: data.id,
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
    projectCreate: async (root, { input }) => {
      return await ProjectService.create({
        ...input,
        clientId: input.clientId,
      });
    },
    projectUpdate: async (root, { id, input }) => {
      return await ProjectService.update(id, {
        code: input.code || undefined,
        title: input.title || undefined,
        clientId: input.clientId || undefined,
        quantity: input.quantity || undefined,
        dueDate: input.dueDate || undefined,
        fee: input.fee || undefined,
      });
    },
    projectDelete: async (root, { id }) => {
      return await ProjectService.delete(id);
    },
  },
};
