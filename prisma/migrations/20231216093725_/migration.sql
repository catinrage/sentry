-- DropForeignKey
ALTER TABLE "ProjectStageSchedule" DROP CONSTRAINT "ProjectStageSchedule_previousId_fkey";

-- AddForeignKey
ALTER TABLE "ProjectStageSchedule" ADD CONSTRAINT "ProjectStageSchedule_previousId_fkey" FOREIGN KEY ("previousId") REFERENCES "ProjectStageSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
