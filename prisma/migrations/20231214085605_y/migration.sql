/*
  Warnings:

  - You are about to drop the column `dateEnd` on the `ProjectStageSchedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectStageSchedule" DROP COLUMN "dateEnd",
ADD COLUMN     "dateEndActual" TIMESTAMP(3),
ADD COLUMN     "dateEndEstimated" TIMESTAMP(3);
