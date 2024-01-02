-- AlterTable
ALTER TABLE "ProjectStageScheduleMetadata" ALTER COLUMN "durationSetup" SET DEFAULT -1,
ALTER COLUMN "durationPreparation" SET DEFAULT -1,
ALTER COLUMN "durationCycle" SET DEFAULT -1,
ALTER COLUMN "numberOfOutputParts" SET DEFAULT -1,
ALTER COLUMN "numberOfSetups" SET DEFAULT -1,
ALTER COLUMN "efficiencyEstimated" SET DEFAULT -1;
