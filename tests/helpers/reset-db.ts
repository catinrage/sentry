// src/tests/helpers/reset-db.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (): Promise<void> => {
  await prisma.$transaction([
    prisma.projectStageSchedule.deleteMany(),
    prisma.projectStage.deleteMany(),
    prisma.project.deleteMany(),
    prisma.machine.deleteMany(),
    prisma.client.deleteMany(),
  ]);
};
