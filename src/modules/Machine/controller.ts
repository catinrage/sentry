import prisma from '@prisma';
import { ControllerType } from '@types';
import { Inspectors } from '@inspectors';
import { MachineInputCreate, MachineInputUpdate } from 'src/codegen/graphql';

export class MachineController implements ControllerType {
  async create(data: MachineInputCreate) {
    return await Inspectors.get('Machine')
      .at('create')
      .execute(data, async () => {
        return await prisma.machine.create({
          data,
        });
      });
  }

  async update(machineId: string, data: MachineInputUpdate) {
    return await Inspectors.get('Machine')
      .at('update')
      .execute({ id: machineId, data }, async () => {
        return await prisma.machine.update({
          where: {
            id: machineId,
          },
          data,
        });
      });
  }

  async delete(machineId: string) {
    return await Inspectors.get('Machine')
      .at('delete')
      .execute({ id: machineId }, async () => {
        return await prisma.machine.delete({
          where: {
            id: machineId,
          },
        });
      });
  }
}
