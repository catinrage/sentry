/*
  Warnings:

  - You are about to drop the column `cycleDuration` on the `ProjectStage` table. All the data in the column will be lost.
  - You are about to drop the column `preparationDuration` on the `ProjectStage` table. All the data in the column will be lost.
  - You are about to drop the column `setupDuration` on the `ProjectStage` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `ProjectStageSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `ProjectStageScheduleInterruption` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `ProjectStageScheduleInterruption` table. All the data in the column will be lost.
  - Added the required column `durationCycle` to the `ProjectStage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationPreparation` to the `ProjectStage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationSetup` to the `ProjectStage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateStart` to the `ProjectStageSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateEnd` to the `ProjectStageScheduleInterruption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateStart` to the `ProjectStageScheduleInterruption` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MachineTypeEnum" AS ENUM ('CNC_MILLING', 'CNC_TURNING');

-- AlterTable
ALTER TABLE "Machine" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "type" "MachineTypeEnum" NOT NULL DEFAULT 'CNC_MILLING';

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "fee" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProjectStage" DROP COLUMN "cycleDuration",
DROP COLUMN "preparationDuration",
DROP COLUMN "setupDuration",
ADD COLUMN     "durationCycle" INTEGER NOT NULL,
ADD COLUMN     "durationPreparation" INTEGER NOT NULL,
ADD COLUMN     "durationSetup" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProjectStageSchedule" DROP COLUMN "startDate",
ADD COLUMN     "dateStart" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ProjectStageScheduleInterruption" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "dateEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateStart" TIMESTAMP(3) NOT NULL;
