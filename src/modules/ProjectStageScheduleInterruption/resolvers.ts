import controllers from '@controllers';
import prisma from '@prisma';
import { ProjectStageScheduleInterruptionModule } from './codegen/module-types';

export const resolvers: ProjectStageScheduleInterruptionModule.Resolvers = {
  ProjectStageSchedule: {
    interruptions: async (parent) => {
      return await prisma.projectStageSchedule
        .findFirstOrThrow({
          where: {
            id: parent.id,
          },
        })
        .interruptions();
    },
  },
  Mutation: {
    projectStageScheduleInterruptionCreate: async (_, { input }) => {
      return await controllers['ProjectStageScheduleInterruption'].create(input);
    },
    projectStageScheduleInterruptionUpdate: async (_, { id, input }) => {
      return await controllers['ProjectStageScheduleInterruption'].update(id, input);
    },
    projectStageScheduleInterruptionDelete: async (_, { id }) => {
      return await controllers['ProjectStageScheduleInterruption'].delete(id);
    },
  },
};
