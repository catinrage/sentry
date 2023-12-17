import { prisma } from '@providers';
import { errors } from '@helpers';
import type { Prisma } from '@prisma/client';
import {
  ProjectInputUpdate,
  MutationResponse,
  ProjectStageScheduleInterruptionInputCreate,
  ProjectStageScheduleInterruptionInputUpdate,
} from 'src/codegen/graphql';
import {
  validateProjectStageScheduleInterruptionCreate,
  validateProjectStageScheduleInterruptionUpdate,
  validateProjectStageScheduleInterruptionDelete,
} from './validator';
import { ProjectStageScheduleService } from '../ProjectStageSchedule/service';

export class ProjectStageScheduleInterruptionService {
  static async create(data: ProjectStageScheduleInterruptionInputCreate): Promise<MutationResponse> {
    try {
      await validateProjectStageScheduleInterruptionCreate.parseAsync(data);
      const interruption = await prisma.projectStageScheduleInterruption.create({
        data: {
          schedule: {
            connect: {
              id: data.projectStageScheduleId,
            },
          },
          dateStart: data.dateStart,
          dateEnd: data.dateEnd,
          reason: data.reason,
        },
      });
      await ProjectStageScheduleService.update(data.projectStageScheduleId, {});
      return {
        id: interruption.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async update(
    projectStageScheduleInterruptionId: string,
    data: ProjectStageScheduleInterruptionInputUpdate,
  ): Promise<MutationResponse> {
    try {
      await validateProjectStageScheduleInterruptionUpdate.parseAsync({
        id: projectStageScheduleInterruptionId,
        data,
      });
      const interruption = await prisma.projectStageScheduleInterruption.update({
        where: {
          id: projectStageScheduleInterruptionId,
        },
        data,
      });
      await ProjectStageScheduleService.update(interruption.scheduleId, {});
      return {
        id: interruption.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async delete(projectStageScheduleInterruptionId: string): Promise<MutationResponse> {
    try {
      await validateProjectStageScheduleInterruptionDelete.parseAsync({
        id: projectStageScheduleInterruptionId,
      });
      const interruption = await prisma.projectStageScheduleInterruption.delete({
        where: {
          id: projectStageScheduleInterruptionId,
        },
      });
      await ProjectStageScheduleService.update(interruption.scheduleId, {});
      return {
        id: interruption.id,
        errors: [],
        success: true,
      };
    } catch (error) {
      return errors.handle(error);
    }
  }

  static async exists(where: Prisma.ProjectStageScheduleInterruptionWhereUniqueInput): Promise<boolean> {
    const interruption = await prisma.projectStageScheduleInterruption.findUnique({
      where,
    });
    return !!interruption;
  }
}
