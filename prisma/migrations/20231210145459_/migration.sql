-- DropForeignKey
ALTER TABLE "ProjectStage" DROP CONSTRAINT "ProjectStage_defaultMetadataId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectStageSchedule" DROP CONSTRAINT "ProjectStageSchedule_metadataId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectStageSchedule" DROP CONSTRAINT "ProjectStageSchedule_previousId_fkey";

-- AddForeignKey
ALTER TABLE "ProjectStage" ADD CONSTRAINT "ProjectStage_defaultMetadataId_fkey" FOREIGN KEY ("defaultMetadataId") REFERENCES "ProjectStageScheduleMetadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectStageSchedule" ADD CONSTRAINT "ProjectStageSchedule_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "ProjectStageScheduleMetadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectStageSchedule" ADD CONSTRAINT "ProjectStageSchedule_previousId_fkey" FOREIGN KEY ("previousId") REFERENCES "ProjectStageSchedule"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
