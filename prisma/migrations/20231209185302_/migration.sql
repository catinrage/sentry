/*
  Warnings:

  - You are about to drop the column `durationCycle` on the `ProjectStage` table. All the data in the column will be lost.
  - You are about to drop the column `durationPreparation` on the `ProjectStage` table. All the data in the column will be lost.
  - You are about to drop the column `durationSetup` on the `ProjectStage` table. All the data in the column will be lost.
  - You are about to drop the column `efficiency` on the `ProjectStage` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfOutputParts` on the `ProjectStage` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfSetups` on the `ProjectStage` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `ProjectStage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[defualtMetadataId]` on the table `ProjectStage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[previousId]` on the table `ProjectStageSchedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[metadataId]` on the table `ProjectStageSchedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `defualtMetadataId` to the `ProjectStage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateEnd` to the `ProjectStageSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `machineId` to the `ProjectStageSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metadataId` to the `ProjectStageSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previousId` to the `ProjectStageSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "MachineTypeEnum" ADD VALUE 'CNC_WIRECUT';

-- DropForeignKey
ALTER TABLE "ProjectStageSchedule" DROP CONSTRAINT "ProjectStageSchedule_stageId_fkey";

-- DropIndex
DROP INDEX "ProjectStage_projectId_order_key";

-- AlterTable
ALTER TABLE "ProjectStage" DROP COLUMN "durationCycle",
DROP COLUMN "durationPreparation",
DROP COLUMN "durationSetup",
DROP COLUMN "efficiency",
DROP COLUMN "numberOfOutputParts",
DROP COLUMN "numberOfSetups",
DROP COLUMN "order",
ADD COLUMN     "defualtMetadataId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProjectStageSchedule" ADD COLUMN     "dateEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "machineId" TEXT NOT NULL,
ADD COLUMN     "metadataId" TEXT NOT NULL,
ADD COLUMN     "previousId" TEXT NOT NULL,
ALTER COLUMN "dateStart" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ProjectStageScheduleMetadata" (
    "id" TEXT NOT NULL,
    "durationSetup" INTEGER NOT NULL,
    "durationPreparation" INTEGER NOT NULL,
    "durationCycle" INTEGER NOT NULL,
    "numberOfOutputParts" INTEGER NOT NULL,
    "numberOfSetups" INTEGER NOT NULL,
    "efficiencyEstimated" DOUBLE PRECISION NOT NULL DEFAULT 1,

    CONSTRAINT "ProjectStageScheduleMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectStage_defualtMetadataId_key" ON "ProjectStage"("defualtMetadataId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectStageSchedule_previousId_key" ON "ProjectStageSchedule"("previousId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectStageSchedule_metadataId_key" ON "ProjectStageSchedule"("metadataId");

-- AddForeignKey
ALTER TABLE "ProjectStage" ADD CONSTRAINT "ProjectStage_defualtMetadataId_fkey" FOREIGN KEY ("defualtMetadataId") REFERENCES "ProjectStageScheduleMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectStageSchedule" ADD CONSTRAINT "ProjectStageSchedule_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectStageSchedule" ADD CONSTRAINT "ProjectStageSchedule_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "ProjectStageScheduleMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectStageSchedule" ADD CONSTRAINT "ProjectStageSchedule_previousId_fkey" FOREIGN KEY ("previousId") REFERENCES "ProjectStageSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectStageSchedule" ADD CONSTRAINT "ProjectStageSchedule_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "ProjectStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
