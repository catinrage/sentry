/*
  Warnings:

  - You are about to drop the column `defualtMetadataId` on the `ProjectStage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[defaultMetadataId]` on the table `ProjectStage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `defaultMetadataId` to the `ProjectStage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectStage" DROP CONSTRAINT "ProjectStage_defualtMetadataId_fkey";

-- DropIndex
DROP INDEX "ProjectStage_defualtMetadataId_key";

-- AlterTable
ALTER TABLE "ProjectStage" DROP COLUMN "defualtMetadataId",
ADD COLUMN     "defaultMetadataId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProjectStage_defaultMetadataId_key" ON "ProjectStage"("defaultMetadataId");

-- AddForeignKey
ALTER TABLE "ProjectStage" ADD CONSTRAINT "ProjectStage_defaultMetadataId_fkey" FOREIGN KEY ("defaultMetadataId") REFERENCES "ProjectStageScheduleMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
