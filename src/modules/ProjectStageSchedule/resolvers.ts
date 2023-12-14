import { prisma } from '@providers';
import { ProjectStageScheduleModule } from './codegen/module-types';
import { ProjectStageScheduleService } from './service';

export const resolvers: ProjectStageScheduleModule.Resolvers = {
  ProjectStageSchedule: {
    machine: async (parent) => {
      return await prisma.projectStageSchedule
        .findFirstOrThrow({
          where: {
            id: parent.id,
          },
        })
        .machine();
    },
  },
  // FIXME: Suspicious (too much nested include)
  ProjectStage: {
    schedules: async (parent) => {
      return (
        await prisma.projectStage.findFirstOrThrow({
          where: {
            id: parent.id,
          },
          include: {
            schedules: {
              include: {
                machine: true,
                stage: {
                  include: {
                    project: {
                      include: {
                        client: true,
                      },
                    },
                  },
                },
                metadata: true,
                interruptions: true,
              },
            },
          },
        })
      ).schedules;
    },
  },
  Machine: {
    schedules: async (parent) => {
      return (
        await prisma.machine.findFirstOrThrow({
          where: {
            id: parent.id,
          },
          include: {
            schedules: {
              include: {
                machine: true,
                stage: {
                  include: {
                    project: {
                      include: {
                        client: true,
                      },
                    },
                  },
                },
                metadata: true,
                interruptions: true,
              },
            },
          },
        })
      ).schedules;
    },
  },
  Mutation: {
    projectStageScheduleCreate: async (_, { input }) => {
      const projectStageSchedule = await ProjectStageScheduleService.create(input);
      return projectStageSchedule;
    },
  },
};
