/*
  Warnings:

  - You are about to drop the column `durationCycle` on the `ProjectStageScheduleMetadata` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectStageScheduleMetadata" DROP COLUMN "durationCycle",
ADD COLUMN     "durationExecution" INTEGER NOT NULL DEFAULT -1;
