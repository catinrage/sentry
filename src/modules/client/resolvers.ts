import { ClientModule } from './codegen/module-types';
import { ClientService } from './service';
import { prisma } from '@providers';

export const resolvers: ClientModule.Resolvers = {
  Project: {
    client: async (root) => {
      return await prisma.project
        .findUniqueOrThrow({
          where: {
            id: root.id,
          },
        })
        .client();
    },
  },
  Query: {
    client: async (root, { id }) => {
      return await prisma.client.findUnique({
        where: {
          id,
        },
      });
    },
    clients: async () => {
      return await prisma.client.findMany();
    },
  },
  Mutation: {
    clientCreate: async (root, { input }) => {
      return await ClientService.create(input);
    },
    clientUpdate: async (root, { id, input }) => {
      return await ClientService.update(id, {
        name: input.name ?? undefined,
      });
    },
    clientDelete: async (root, { id }) => {
      return await ClientService.delete(id);
    },
  },
};
