import { prisma } from '@providers';
import { MachineModule } from './codegen/module-types';
import { MachineService } from './service';

export const resolvers: MachineModule.Resolvers = {
  Query: {
    machine: async (_, { id }) => {
      return await prisma.machine.findUnique({
        where: {
          id,
        },
      });
    },
    machines: async (_) => {
      return await prisma.machine.findMany();
    },
  },
  Mutation: {
    machineCreate: async (_, { input }) => {
      return await MachineService.create(input);
    },
    machineUpdate: async (_, { id, input }) => {
      return await MachineService.update(id, input);
    },
    machineDelete: async (_, { id }) => {
      return await MachineService.delete(id);
    },
  },
};
