import { MachineModule } from './codegen/module-types';
import services from '@services';

export const resolvers: MachineModule.Resolvers = {
  Query: {
    machine: async (root, { id }) => {
      const machine = await services.machine.findUnique({
        id,
      });
      return machine;
    },
    machines: async (root, args) => {
      const machines = await services.machine.findMany();
      return machines;
    },
  },
  Mutation: {
    machineCreate: async (root, { input }) => {
      return await services.machine.create({
        ...input,
      });
    },
    machineUpdate: async (root, { id, input }) => {
      return await services.machine.update(id, {
        name: input.name || undefined,
      });
    },
    machineDelete: async (root, { id }) => {
      return await services.machine.delete(id);
    },
  },
};
