import { Client, Prisma } from '@prisma/client';
import { ClientMutationResponse } from '../codegen/graphql';
import { prisma } from '@providers';
import validators from '@validators';
import { errors } from '@helpers';

class ClientService {
  async create({ name }: Prisma.ClientCreateInput): Promise<ClientMutationResponse> {
    try {
      await validators.client.clientCreateInputSchema.parseAsync({ name });
      const client = await prisma.client.create({
        data: {
          name,
        },
      });
      return {
        client,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  async update(id: string, { name }: Prisma.ClientUpdateInput): Promise<ClientMutationResponse> {
    try {
      await validators.client.clientUpdateInputSchema.parseAsync({ id, name });
      const client = await prisma.client.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      return {
        client,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  async delete(id: string): Promise<ClientMutationResponse> {
    try {
      await validators.client.deleteClientInputSchema.parseAsync({ id });
      const client = await prisma.client.delete({
        where: {
          id,
        },
      });
      return {
        client,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  async findUnique(where: Prisma.ClientWhereUniqueInput): Promise<Client | null> {
    return prisma.client.findUnique({
      where,
    });
  }

  async findMany(): Promise<Client[]> {
    return prisma.client.findMany();
  }
}

export const service = new ClientService();
