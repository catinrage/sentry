import prisma from '@prisma';
import { ControllerType } from '@types';
import { Inspectors } from '@inspectors';
import { ClientInputCreate, ClientInputUpdate } from 'src/codegen/graphql';

export class ClientController implements ControllerType {
  async create(data: ClientInputCreate) {
    return await Inspectors.get('Client')
      .at('create')
      .execute(data, async () => {
        return await prisma.client.create({
          data,
        });
      });
  }

  async update(clientId: string, data: ClientInputUpdate) {
    return await Inspectors.get('Client')
      .at('update')
      .execute({ id: clientId, data }, async () => {
        return await prisma.client.update({
          where: {
            id: clientId,
          },
          data,
        });
      });
  }

  async delete(clientId: string) {
    return await Inspectors.get('Client')
      .at('delete')
      .execute({ id: clientId }, async () => {
        return await prisma.client.delete({
          where: {
            id: clientId,
          },
        });
      });
  }
}
