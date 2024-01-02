/*
  Warnings:

  - The values [NOT_STARTED] on the enum `ProjectStageStateEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProjectStageStateEnum_new" AS ENUM ('PENDING', 'IN_PROGRESS', 'PAUSED', 'COMPLETED');
ALTER TABLE "ProjectStageSchedule" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "ProjectStageSchedule" ALTER COLUMN "state" TYPE "ProjectStageStateEnum_new" USING ("state"::text::"ProjectStageStateEnum_new");
ALTER TYPE "ProjectStageStateEnum" RENAME TO "ProjectStageStateEnum_old";
ALTER TYPE "ProjectStageStateEnum_new" RENAME TO "ProjectStageStateEnum";
DROP TYPE "ProjectStageStateEnum_old";
ALTER TABLE "ProjectStageSchedule" ALTER COLUMN "state" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "ProjectStageSchedule" ALTER COLUMN "state" SET DEFAULT 'PENDING';
