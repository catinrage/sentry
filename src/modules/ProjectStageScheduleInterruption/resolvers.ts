import { prisma } from '@providers';
import { ProjectStageScheduleInterruptionModule } from './codegen/module-types';
import { ProjectStageScheduleInterruptionService } from './service';

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
      return await ProjectStageScheduleInterruptionService.create(input);
    },
    projectStageScheduleInterruptionUpdate: async (_, { id, input }) => {
      return await ProjectStageScheduleInterruptionService.update(id, input);
    },
    projectStageScheduleInterruptionDelete: async (_, { id }) => {
      return await ProjectStageScheduleInterruptionService.delete(id);
    },
  },
};
