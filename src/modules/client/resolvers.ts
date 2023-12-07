import { ClientModule } from './codegen/module-types';
import services from '@services';

export const resolvers: ClientModule.Resolvers = {
  Query: {
    client: async (root, { id }, { injector }) => {
      const client = await services.client.findUnique({
        id,
      });
      return client;
    },
    clients: async (root, args, { injector }) => {
      const clients = await services.client.findMany();
      return clients;
    },
  },
  Mutation: {
    clientCreate: async (root, { input }, { injector }) => {
      return await services.client.create({
        ...input,
      });
    },
    clientUpdate: async (root, { id, input }, { injector }) => {
      return await services.client.update(id, {
        name: input.name || undefined,
      });
    },
    clientDelete: async (root, { id }, { injector }) => {
      return await services.client.delete(id);
    },
  },
};
