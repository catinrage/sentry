/*
  Warnings:

  - The `state` column on the `ProjectStageSchedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProjectStageScheduleStateEnum" AS ENUM ('PENDING', 'IN_PROGRESS', 'PAUSED', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "ProjectStage" DROP CONSTRAINT "ProjectStage_projectId_fkey";

-- AlterTable
ALTER TABLE "ProjectStageSchedule" DROP COLUMN "state",
ADD COLUMN     "state" "ProjectStageScheduleStateEnum" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "ProjectStageStateScheduleEnum";

-- AddForeignKey
ALTER TABLE "ProjectStage" ADD CONSTRAINT "ProjectStage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
