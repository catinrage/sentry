import prisma from '@prisma';
import { ControllerType } from '@types';
import { Inspectors } from '@inspectors';
import { ProjectInputCreate, ProjectInputUpdate } from 'src/codegen/graphql';

export class ProjectController implements ControllerType {
  async create(data: ProjectInputCreate) {
    return await Inspectors.get('Project')
      .at('create')
      .execute(data, async () => {
        return await prisma.project.create({
          data: {
            code: data.code,
            title: data.title,
            quantity: data.quantity,
            client: {
              connect: {
                id: data.clientId,
              },
            },
          },
        });
      });
  }

  async update(projectId: string, data: ProjectInputUpdate) {
    return await Inspectors.get('Project')
      .at('update')
      .execute({ id: projectId, data }, async () => {
        return await prisma.project.update({
          where: {
            id: projectId,
          },
          data,
        });
      });
  }

  async delete(projectId: string) {
    return await Inspectors.get('Project')
      .at('delete')
      .execute({ id: projectId }, async () => {
        return await prisma.project.delete({
          where: {
            id: projectId,
          },
        });
      });
  }
}
