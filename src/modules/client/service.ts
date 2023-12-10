import { Client, Prisma } from '@prisma/client';
import { MutationResponse } from 'src/codegen/graphql';
import { prisma } from '@providers';
import { clientCreateInputSchema, clientUpdateInputSchema, deleteClientInputSchema } from './validators';
import { errors } from '@helpers';

export class ClientService {
  static async create(data: Prisma.ClientUncheckedCreateInput): Promise<MutationResponse> {
    try {
      await clientCreateInputSchema.safeParseAsync(data);
      const client = await prisma.client.create({
        data,
      });
      return {
        id: client.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async update(id: string, data: Prisma.ClientUncheckedUpdateInput): Promise<MutationResponse> {
    try {
      await clientUpdateInputSchema.parseAsync({ id, ...data });
      const client = await prisma.client.update({
        where: {
          id,
        },
        data,
      });
      return {
        id: client.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async delete(id: string): Promise<MutationResponse> {
    try {
      await deleteClientInputSchema.parseAsync({ id });
      const client = await prisma.client.delete({
        where: {
          id,
        },
      });
      return {
        id: client.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }
}
