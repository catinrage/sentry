import { prisma } from '@providers';
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
};
