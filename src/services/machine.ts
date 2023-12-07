import { Machine, Prisma } from '@prisma/client';
import { MachineMutationResponse } from '../codegen/graphql';
import { prisma } from '@providers';
import validators from '@validators';
import { errors } from '@helpers';

class MachineService {
  async create({ name }: Prisma.MachineCreateInput): Promise<MachineMutationResponse> {
    try {
      await validators.machine.machineCreateInputSchema.parseAsync({ name });
      const machine = await prisma.machine.create({
        data: {
          name,
        },
      });
      return {
        machine,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  async update(id: string, { name }: Prisma.MachineUpdateInput): Promise<MachineMutationResponse> {
    try {
      await validators.machine.machineUpdateInputSchema.parseAsync({ id, name });
      const machine = await prisma.machine.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      return {
        machine,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  async delete(id: string): Promise<MachineMutationResponse> {
    try {
      await validators.machine.machineDeleteInputSchema.parseAsync({ id });
      const machine = await prisma.machine.delete({
        where: {
          id,
        },
      });
      return {
        machine,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  async findUnique(where: Prisma.MachineWhereUniqueInput): Promise<Machine | null> {
    return prisma.machine.findUnique({
      where,
    });
  }

  async findMany(): Promise<Machine[]> {
    return prisma.machine.findMany();
  }
}

export const service = new MachineService();
