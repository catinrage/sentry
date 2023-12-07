import { Inject, Injectable, InjectionToken } from 'graphql-modules';
import { PrismaService } from '../../common/providers/prisma.provider';
import { Client, Prisma } from '@prisma/client';
import { clientCreateInputSchema, clientUpdateInputSchema, deleteClientInputSchema } from '../validator';
import { ClientMutationResponse } from '../../../codegen/graphql';
import { handleError } from '../../../helpers/errors';

@Injectable()
export class ClientService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create({ name }: Prisma.ClientCreateInput): Promise<ClientMutationResponse> {
    try {
      await clientCreateInputSchema.parseAsync({ name });
      const client = await this.prisma.client.create({
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
      return handleError(error);
    }
  }

  async update(id: string, { name }: Prisma.ClientUpdateInput): Promise<ClientMutationResponse> {
    try {
      await clientUpdateInputSchema.parseAsync({ id, name });
      const client = await this.prisma.client.update({
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
      return handleError(error);
    }
  }

  /**
   * Deletes a client.
   * @param {string} id - The ID of the client to delete.
   * @returns {Promise<ClientMutationResponse>} - The deleted client or errors.
   */
  async delete(id: string): Promise<ClientMutationResponse> {
    try {
      await deleteClientInputSchema.parseAsync({ id });
      const client = await this.prisma.client.delete({
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
      return handleError(error);
    }
  }

  async findUnique(where: Prisma.ClientWhereUniqueInput): Promise<Client | null> {
    return this.prisma.client.findUnique({
      where,
    });
  }

  async findMany(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }
}
