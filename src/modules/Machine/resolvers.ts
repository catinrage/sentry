import controllers from '@controllers';
import prisma from '@prisma';
import { MachineModule } from './codegen/module-types';

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
      return await controllers['Machine'].create(input);
    },
    machineUpdate: async (_, { id, input }) => {
      return await controllers['Machine'].update(id, input);
    },
    machineDelete: async (_, { id }) => {
      return await controllers['Machine'].delete(id);
    },
  },
};
