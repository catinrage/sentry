import { MachineModule } from './codegen/module-types';
import { MachineService } from './providers';

export const resolvers: MachineModule.Resolvers = {
  Query: {
    machine: async (root, { id }, { injector }) => {
      const machineService = injector.get(MachineService);
      const machine = await machineService.findUnique({
        id,
      });
      return machine;
    },
    machines: async (root, args, { injector }) => {
      const machineService = injector.get(MachineService);
      const machines = await machineService.findMany();
      return machines;
    },
  },
  Mutation: {
    machineCreate: async (root, { input }, { injector }) => {
      const machineService = injector.get(MachineService);
      return await machineService.create({
        ...input,
      });
    },
    machineUpdate: async (root, { id, input }, { injector }) => {
      const machineService = injector.get(MachineService);
      return await machineService.update(id, {
        name: input.name || undefined,
      });
    },
    machineDelete: async (root, { id }, { injector }) => {
      const machineService = injector.get(MachineService);
      return await machineService.delete(id);
    },
  },
};
