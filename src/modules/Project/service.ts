import { prisma } from '@providers';
import { errors } from '@helpers';
import type { Prisma } from '@prisma/client';
import { ProjectInputCreate, ProjectInputUpdate, MutationResponse } from 'src/codegen/graphql';
import { validateProjectCreate, validateProjectDelete, validateProjectUpdate } from './validator';

export class ProjectService {
  static async create(data: ProjectInputCreate): Promise<MutationResponse> {
    try {
      await validateProjectCreate.parseAsync(data);
      const project = await prisma.project.create({
        data,
      });
      return {
        id: project.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async update(projectId: string, data: ProjectInputUpdate): Promise<MutationResponse> {
    try {
      await validateProjectUpdate.parseAsync({ id: projectId, data });
      const project = await prisma.project.update({
        where: {
          id: projectId,
        },
        data,
      });
      return {
        id: project.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async delete(projectId: string): Promise<MutationResponse> {
    try {
      await validateProjectDelete.parseAsync({ id: projectId });
      const project = await prisma.project.delete({
        where: {
          id: projectId,
        },
      });
      return {
        id: project.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async exists(where: Prisma.ProjectWhereUniqueInput): Promise<boolean> {
    const project = await prisma.project.findUnique({
      where,
    });
    return !!project;
  }

  // this one is a little different form previous ones, it only check for stages with schedules
  static async hasAnyStages(projectId: string): Promise<boolean> {
    const stages = await prisma.projectStage.findMany({
      where: {
        projectId,
        schedules: {
          some: {},
        },
      },
    });
    return (stages?.length || 0) > 0;
  }
}
