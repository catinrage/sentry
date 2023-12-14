import { prisma } from '@providers';
import { ClientModule } from './codegen/module-types';
import { ClientService } from './service';

export const resolvers: ClientModule.Resolvers = {
  Query: {
    client: async (_, { id }) => {
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
    clientCreate: async (_, { input }) => {
      return await ClientService.create(input);
    },
    clientUpdate: async (_, { id, input }) => {
      return await ClientService.update(id, input);
    },
    clientDelete: async (_, { id }) => {
      return await ClientService.delete(id);
    },
  },
};
