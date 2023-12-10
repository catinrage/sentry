import { Project, Prisma } from '@prisma/client';
import { MutationResponse } from 'src/codegen/graphql';
import { prisma } from '@providers';
import { projectCreateInputSchema, projectDeleteInputSchema, projectUpdateInputSchema } from './validators';
import { errors } from '@helpers';

export class ProjectService {
  static async create(data: Prisma.ProjectUncheckedCreateInput): Promise<MutationResponse> {
    try {
      await projectCreateInputSchema.parseAsync(data);
      const project = await prisma.$transaction(async (prisma) => {
        const project = await prisma.project.create({
          data,
        });
        const projectStage = await prisma.projectStage.create({
          data: {
            projectId: project.id,
          },
        });
        return project;
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

  static async update(id: string, data: Prisma.ProjectUncheckedUpdateInput): Promise<MutationResponse> {
    try {
      await projectUpdateInputSchema.parseAsync({ id, ...data });
      const project = await prisma.project.update({
        where: {
          id,
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

  static async delete(id: string): Promise<MutationResponse> {
    try {
      await projectDeleteInputSchema.parseAsync({ id });
      const project = await prisma.project.delete({
        where: {
          id,
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
}
