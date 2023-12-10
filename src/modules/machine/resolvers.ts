import { MachineModule } from './codegen/module-types';
import { MachineService } from './service';
import { prisma } from '@providers';

export const resolvers: MachineModule.Resolvers = {
  Query: {
    machine: async (root, { id }) => {
      return await prisma.machine.findUnique({
        where: {
          id,
        },
      });
    },
    machines: async (root, args) => {
      return await prisma.machine.findMany();
    },
  },
  Mutation: {
    machineCreate: async (root, { input }) => {
      return await MachineService.create({
        ...input,
      });
    },
    machineUpdate: async (root, { id, input }) => {
      return await MachineService.update(id, {
        name: input.name || undefined,
      });
    },
    machineDelete: async (root, { id }) => {
      return await MachineService.delete(id);
    },
  },
};
