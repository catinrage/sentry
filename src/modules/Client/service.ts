import { prisma } from '@providers';
import { errors } from '@helpers';
import type { Prisma } from '@prisma/client';
import { ClientInputCreate, ClientInputUpdate, MutationResponse } from 'src/codegen/graphql';
import { validateClientCreate, validateClientUpdate, validateClientDelete } from './validator';

export class ClientService {
  static async create(data: ClientInputCreate): Promise<MutationResponse> {
    try {
      await validateClientCreate.parseAsync(data);
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

  static async update(clientId: string, data: ClientInputUpdate): Promise<MutationResponse> {
    try {
      await validateClientUpdate.parseAsync({ id: clientId, data });
      const client = await prisma.client.update({
        where: {
          id: clientId,
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

  static async delete(clientId: string): Promise<MutationResponse> {
    try {
      await validateClientDelete.parseAsync({ id: clientId });
      const client = await prisma.client.delete({
        where: {
          id: clientId,
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

  static async exists(where: Prisma.ClientWhereUniqueInput): Promise<boolean> {
    const client = await prisma.client.findUnique({
      where,
    });
    return !!client;
  }

  static async hasAnyProjects(clientId: string): Promise<boolean> {
    const projects = await prisma.client
      .findUnique({
        where: {
          id: clientId,
        },
      })
      .projects();
    return (projects?.length || 0) > 0;
  }
}
