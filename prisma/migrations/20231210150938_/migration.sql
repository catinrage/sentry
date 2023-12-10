/*
  Warnings:

  - You are about to drop the column `defaultMetadataId` on the `ProjectStage` table. All the data in the column will be lost.
  - You are about to drop the column `metadataId` on the `ProjectStageSchedule` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ProjectStage_defaultMetadataId_key";

-- DropIndex
DROP INDEX "ProjectStageSchedule_metadataId_key";

-- AlterTable
ALTER TABLE "ProjectStage" DROP COLUMN "defaultMetadataId";

-- AlterTable
ALTER TABLE "ProjectStageSchedule" DROP COLUMN "metadataId";
