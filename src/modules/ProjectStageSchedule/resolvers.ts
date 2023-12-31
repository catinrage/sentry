import controllers from '@controllers';
import prisma from '@prisma';
import { ProjectStageScheduleModule } from './codegen/module-types';

const scheduleIncludeSubset = {
  include: {
    machine: true,
    stage: {
      include: {
        project: {
          include: { client: true },
        },
      },
    },
    metadata: true,
    interruptions: true,
    previous: {
      include: {
        machine: true,
        stage: {
          include: {
            project: {
              include: { client: true },
            },
          },
        },
        metadata: true,
        interruptions: true,
      },
    },
  },
};

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
    next: async (parent) => {
      return await prisma.projectStageSchedule
        .findUniqueOrThrow({
          where: {
            previousId: parent.id,
          },
        })
        .next(scheduleIncludeSubset);
    },
    previous: async (parent) => {
      return await prisma.projectStageSchedule
        .findUniqueOrThrow({
          where: {
            previousId: parent.id,
          },
        })
        .previous(scheduleIncludeSubset);
    },
    dateStart: (parent) => {
      return parent.dateStartFixed || parent.previous?.dateEnd;
    },
    dateEnd: async (parent) => {
      return parent.dateEndActual || parent.dateEndEstimated;
    },
  },
  ProjectStage: {
    schedules: async (parent) => {
      return await prisma.projectStage
        .findFirstOrThrow({
          where: {
            id: parent.id,
          },
        })
        .schedules(scheduleIncludeSubset);
    },
  },
  Machine: {
    schedules: async (parent) => {
      return await prisma.machine
        .findFirstOrThrow({
          where: {
            id: parent.id,
          },
        })
        .schedules({
          ...scheduleIncludeSubset,
          orderBy: {
            dateEndEstimated: 'asc',
          },
        });
    },
  },
  Mutation: {
    projectStageScheduleCreate: async (_, { input }) => {
      return await controllers['ProjectStageSchedule'].create(input);
    },
    projectStageScheduleUpdate: async (_, { id, input }) => {
      return await controllers['ProjectStageSchedule'].update(id, input);
    },
    projectStageScheduleDelete: async (_, { id }) => {
      return await controllers['ProjectStageSchedule'].delete(id);
    },
  },
};
