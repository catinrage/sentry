/*
  Warnings:

  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `fee` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectStageStateEnum" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'PAUSED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "fee" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Project_id_seq";

-- CreateTable
CREATE TABLE "ProjectStage" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT,
    "cycleDuration" INTEGER NOT NULL,
    "preparationDuration" INTEGER NOT NULL,
    "setupDuration" INTEGER NOT NULL,
    "numberOfOutputParts" INTEGER NOT NULL,
    "numberOfSetups" INTEGER NOT NULL,
    "efficiency" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectStageSchedule" (
    "id" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "state" "ProjectStageStateEnum" NOT NULL DEFAULT 'NOT_STARTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectStageSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectStageScheduleInterruption" (
    "id" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "ProjectStageScheduleInterruption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectStage_projectId_order_key" ON "ProjectStage"("projectId", "order");

-- AddForeignKey
ALTER TABLE "ProjectStage" ADD CONSTRAINT "ProjectStage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectStageSchedule" ADD CONSTRAINT "ProjectStageSchedule_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "ProjectStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectStageScheduleInterruption" ADD CONSTRAINT "ProjectStageScheduleInterruption_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "ProjectStageSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
