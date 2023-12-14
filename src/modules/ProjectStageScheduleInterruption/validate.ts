import { z as zod } from 'zod';
import { prisma } from '@providers';
import { ProjectStageScheduleService } from '@services';

const validateProjectStageScheduleInterruptionBase = zod.object({
  projectStageScheduleId: zod.string().refine(
    async (id) => {
      return await ProjectStageScheduleService.exists({
        id,
      });
    },
    {
      message: 'زمانبندی مورد نظر یافت نشد',
    },
  ),
  reason: zod
    .string()
    .min(1, 'حداقل طول دلیل 1 کاراکتر می باشد')
    .max(255, 'حداکثر طول دلیل 255 کاراکتر می باشد'),
  startDate: zod.date(),
  endDate: zod.date(),
});

export const validateProjectStageScheduleInterruptionCreate =
  validateProjectStageScheduleInterruptionBase.superRefine((args, ctx) => {
    // start and end date must be within bound of schedule dateStart and dateEnd
    const schedule = prisma.projectStageSchedule.findUniqueOrThrow({
      where: {
        id: args.projectStageScheduleId,
      },
    });
    // schedule end date will be obtained in two possible ways, either it has a endDate determined or it has
    const startDate = new Date(args.startDate);
    const endDate = new Date(args.endDate);
  });
