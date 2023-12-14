/*
  Warnings:

  - The `state` column on the `ProjectStageSchedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProjectStageStateScheduleEnum" AS ENUM ('PENDING', 'IN_PROGRESS', 'PAUSED', 'COMPLETED');

-- AlterTable
ALTER TABLE "ProjectStageSchedule" DROP COLUMN "state",
ADD COLUMN     "state" "ProjectStageStateScheduleEnum" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "dateEnd" DROP NOT NULL;

-- DropEnum
DROP TYPE "ProjectStageStateEnum";
