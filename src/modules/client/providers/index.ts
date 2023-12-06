import { Inject, Injectable, InjectionToken } from 'graphql-modules';
import { PrismaService } from '../../common/providers/prisma.provider';
import { Client, Prisma } from '@prisma/client';
import { clientCreateInputSchema, clientUpdateInputSchema } from '../validator';
import { ClientMutationResponse } from '../../../codegen/graphql';
import { handleError } from '../../../helpers/errors';

/**
 * Service for managing clients.
 */
@Injectable()
export class ClientService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  /**
   * Creates a new client.
   * @param {Prisma.ClientCreateInput} data - The data for creating the client.
   * @returns {Promise<ClientMutationResponse>} - The created client or errors.
   */
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

  /**
   * Updates an existing client.
   * @param {string} id - The ID of the client to update.
   * @param {Prisma.ClientUpdateInput} data - The data for updating the client.
   * @returns {Promise<ClientMutationResponse>} - The updated client or errors.
   */
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
      await clientUpdateInputSchema.parseAsync({ id });
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

  /**
   * Finds a unique client.
   * @param {Prisma.ClientWhereUniqueInput} where - The where clause for finding the client.
   * @returns {Promise<Client | null>} - The found client or null.
   */
  async findUnique(where: Prisma.ClientWhereUniqueInput): Promise<Client | null> {
    return this.prisma.client.findUnique({
      where,
    });
  }

  /**
   * Finds all clients.
   * @returns {Promise<Client[]>} - The found clients.
   */
  async findMany(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }
}
