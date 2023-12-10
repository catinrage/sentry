import { Machine, Prisma } from '@prisma/client';
import { MutationResponse } from 'src/codegen/graphql';
import { prisma } from '@providers';
import { machineCreateInputSchema, machineDeleteInputSchema, machineUpdateInputSchema } from './validators';
import { errors } from '@helpers';

export class MachineService {
  static async create(data: Prisma.MachineCreateInput): Promise<MutationResponse> {
    try {
      await machineCreateInputSchema.parseAsync(data);
      const machine = await prisma.machine.create({
        data,
      });
      return {
        id: machine.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async update(id: string, { name }: Prisma.MachineUpdateInput): Promise<MutationResponse> {
    try {
      await machineUpdateInputSchema.parseAsync({ id, name });
      const machine = await prisma.machine.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      return {
        id: machine.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async delete(id: string): Promise<MutationResponse> {
    try {
      await machineDeleteInputSchema.parseAsync({ id });
      const machine = await prisma.machine.delete({
        where: {
          id,
        },
      });
      return {
        id: machine.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }
}
