/*
  Warnings:

  - A unique constraint covering the columns `[projectStageId]` on the table `ProjectStageScheduleMetadata` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectStageScheduleId]` on the table `ProjectStageScheduleMetadata` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectStageId` to the `ProjectStageScheduleMetadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectStageScheduleId` to the `ProjectStageScheduleMetadata` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectStage" DROP CONSTRAINT "ProjectStage_defaultMetadataId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectStageSchedule" DROP CONSTRAINT "ProjectStageSchedule_metadataId_fkey";

-- AlterTable
ALTER TABLE "ProjectStageScheduleMetadata" ADD COLUMN     "projectStageId" TEXT NOT NULL,
ADD COLUMN     "projectStageScheduleId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProjectStageScheduleMetadata_projectStageId_key" ON "ProjectStageScheduleMetadata"("projectStageId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectStageScheduleMetadata_projectStageScheduleId_key" ON "ProjectStageScheduleMetadata"("projectStageScheduleId");

-- AddForeignKey
ALTER TABLE "ProjectStageScheduleMetadata" ADD CONSTRAINT "ProjectStageScheduleMetadata_projectStageId_fkey" FOREIGN KEY ("projectStageId") REFERENCES "ProjectStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectStageScheduleMetadata" ADD CONSTRAINT "ProjectStageScheduleMetadata_projectStageScheduleId_fkey" FOREIGN KEY ("projectStageScheduleId") REFERENCES "ProjectStageSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
