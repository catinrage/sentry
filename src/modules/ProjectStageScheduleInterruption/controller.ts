import prisma from '@prisma';
import { ControllerType } from '@types';
import { Inspectors } from '@inspectors';
import {
  ProjectStageScheduleInterruptionInputCreate,
  ProjectStageScheduleInterruptionInputUpdate,
} from 'src/codegen/graphql';
import controllers from '@controllers';

export class ProjectStageScheduleInterruptionController implements ControllerType {
  async create(data: ProjectStageScheduleInterruptionInputCreate) {
    return await Inspectors.get('ProjectStageScheduleInterruption')
      .at('create')
      .execute(data, async () => {
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
        /*
          @why: 
          we call update method of ProjectStageScheduleService to update dateEndEstimated (recursive)
        */
        await controllers['ProjectStageSchedule'].update(data.projectStageScheduleId, {});
        return interruption;
      });
  }

  async update(
    projectStageScheduleInterruptionId: string,
    data: ProjectStageScheduleInterruptionInputUpdate,
  ) {
    return await Inspectors.get('ProjectStageScheduleInterruption')
      .at('update')
      .execute({ id: projectStageScheduleInterruptionId, data }, async () => {
        const interruption = await prisma.projectStageScheduleInterruption.update({
          where: {
            id: projectStageScheduleInterruptionId,
          },
          data,
        });
        /*
          @why: 
          we call update method of ProjectStageScheduleService to update dateEndEstimated (recursive)
        */
        await controllers['ProjectStageSchedule'].update(interruption.scheduleId, {});
        return interruption;
      });
  }

  async delete(projectStageScheduleInterruptionId: string) {
    return await Inspectors.get('ProjectStageScheduleInterruption')
      .at('delete')
      .execute({ id: projectStageScheduleInterruptionId }, async () => {
        const interruption = await prisma.projectStageScheduleInterruption.delete({
          where: {
            id: projectStageScheduleInterruptionId,
          },
        });
        await controllers['ProjectStageSchedule'].update(interruption.scheduleId, {});
        return interruption;
      });
  }
}
