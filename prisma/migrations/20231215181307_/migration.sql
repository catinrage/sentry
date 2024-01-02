/*
  Warnings:

  - You are about to drop the column `dateStart` on the `ProjectStageSchedule` table. All the data in the column will be lost.
  - Made the column `dateEndEstimated` on table `ProjectStageSchedule` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "ProjectStageSchedule" DROP COLUMN "dateStart",
ADD COLUMN     "dateStartFixed" TIMESTAMP(3),
ALTER COLUMN "dateEndEstimated" SET NOT NULL;
