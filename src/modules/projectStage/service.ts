import { Prisma } from '@prisma/client';
import { prisma } from '@providers';

export class ProjectStageService {
  static async create(
    data: Omit<Prisma.ProjectStageUncheckedCreateInput, 'defaultMetadataId'> & {
      defaultMetadata: Prisma.ProjectStageScheduleMetadataUncheckedCreateInput | null;
    },
  ) {
    return await prisma.$transaction(async (prisma) => {
      const projectStage = await prisma.projectStage.create({
        data: {
          ...data,
          defaultMetadata: undefined,
        },
      });
      const metadata = await prisma.projectStageScheduleMetadata.create({
        data: {
          ...data.defaultMetadata,
          projectStageId: projectStage.id,
        },
      });

      return projectStage;
    });
  }
}
