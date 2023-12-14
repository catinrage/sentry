import { prisma } from '@providers';
import { errors } from '@helpers';
import type { Prisma } from '@prisma/client';
import { MachineInputCreate, MachineInputUpdate, MutationResponse } from 'src/codegen/graphql';
import { validateMachineCreate, validateMachineUpdate, validateMachineDelete } from './validator';

export class MachineService {
  static async create(data: MachineInputCreate): Promise<MutationResponse> {
    try {
      await validateMachineCreate.parseAsync(data);
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

  static async update(machineId: string, data: MachineInputUpdate): Promise<MutationResponse> {
    try {
      await validateMachineDelete.parseAsync({ id: machineId, data });
      const machine = await prisma.machine.update({
        where: {
          id: machineId,
        },
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

  static async delete(machineId: string): Promise<MutationResponse> {
    try {
      await validateMachineUpdate.parseAsync({ id: machineId });
      const machine = await prisma.machine.delete({
        where: {
          id: machineId,
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

  static async exists(where: Prisma.MachineWhereUniqueInput): Promise<boolean> {
    const machine = await prisma.machine.findUnique({
      where,
    });
    return !!machine;
  }

  static async hasAnySchedules(machineId: string): Promise<boolean> {
    const schedules = await prisma.machine
      .findUnique({
        where: {
          id: machineId,
        },
      })
      .schedules();
    return (schedules?.length || 0) > 0;
  }
}
