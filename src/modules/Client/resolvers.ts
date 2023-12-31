import controllers from '@controllers';
import prisma from '@prisma';
import { ClientModule } from './codegen/module-types';

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
      return await controllers['Client'].create(input);
    },
    clientUpdate: async (_, { id, input }) => {
      return await controllers['Client'].update(id, input);
    },
    clientDelete: async (_, { id }) => {
      return await controllers['Client'].delete(id);
    },
  },
};
