import { Inject, Injectable, InjectionToken } from 'graphql-modules';
import { PrismaService } from '../../common/providers/prisma.provider';
import { Machine, Prisma } from '@prisma/client';
import { machineCreateInputSchema, machineUpdateInputSchema, machineDeleteInputSchema } from '../validator';
import { MachineMutationResponse } from '../../../codegen/graphql';
import { handleError } from '../../../helpers/errors';

@Injectable()
export class MachineService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create({ name }: Prisma.MachineCreateInput): Promise<MachineMutationResponse> {
    try {
      await machineCreateInputSchema.parseAsync({ name });
      const machine = await this.prisma.machine.create({
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
      return handleError(error);
    }
  }

  async update(id: string, { name }: Prisma.MachineUpdateInput): Promise<MachineMutationResponse> {
    try {
      await machineUpdateInputSchema.parseAsync({ id, name });
      const machine = await this.prisma.machine.update({
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
      return handleError(error);
    }
  }

  async delete(id: string): Promise<MachineMutationResponse> {
    try {
      await machineDeleteInputSchema.parseAsync({ id });
      const machine = await this.prisma.machine.delete({
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
      return handleError(error);
    }
  }

  async findUnique(where: Prisma.MachineWhereUniqueInput): Promise<Machine | null> {
    return this.prisma.machine.findUnique({
      where,
    });
  }

  async findMany(): Promise<Machine[]> {
    return this.prisma.machine.findMany();
  }
}
