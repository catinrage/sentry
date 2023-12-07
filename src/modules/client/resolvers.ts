import { ClientModule } from './codegen/module-types';
import { ClientService } from './providers';

export const resolvers: ClientModule.Resolvers = {
  Query: {
    client: async (root, { id }, { injector }) => {
      const clientService = injector.get(ClientService);
      const client = await clientService.findUnique({
        id,
      });
      return client;
    },
    clients: async (root, args, { injector }) => {
      const clientService = injector.get(ClientService);
      const clients = await clientService.findMany();
      return clients;
    },
  },
  Mutation: {
    clientCreate: async (root, { input }, { injector }) => {
      const clientService = injector.get(ClientService);
      return await clientService.create({
        ...input,
      });
    },
    clientUpdate: async (root, { id, input }, { injector }) => {
      const clientService = injector.get(ClientService);
      return await clientService.update(id, {
        name: input.name || undefined,
      });
    },
    clientDelete: async (root, { id }, { injector }) => {
      const clientService = injector.get(ClientService);
      return await clientService.delete(id);
    },
  },
};
