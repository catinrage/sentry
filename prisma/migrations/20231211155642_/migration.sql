/*
  Warnings:

  - You are about to drop the column `order` on the `ProjectStage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectStage" DROP COLUMN "order",
ADD COLUMN     "number" INTEGER NOT NULL DEFAULT 1;
