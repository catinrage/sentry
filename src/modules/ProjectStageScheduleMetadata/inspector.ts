import zod from 'zod';
import prisma from '@prisma';
import { InspectorType } from '@types';
import {
  ProjectStageScheduleMetadataInputCreate,
  ProjectStageScheduleMetadataInputUpdate,
} from 'src/codegen/graphql';

export const inspectors: InspectorType<
  ProjectStageScheduleMetadataInputCreate,
  ProjectStageScheduleMetadataInputUpdate
> = {
  get base() {
    return zod
      .object({
        durationSetup: zod.number().superRefine(async (durationSetup, { addIssue }) => {
          if (durationSetup < 0) {
            addIssue({
              code: 'custom',
              message: 'مدت زمان راه اندازی نمیتواند کمتر از 0 دقیقه باشد',
            });
          }
        }),
        durationPreparation: zod.number().superRefine(async (durationPreparation, { addIssue }) => {
          if (durationPreparation < 0) {
            addIssue({
              code: 'custom',
              message: 'مدت زمان آماده سازی نمیتواند کمتر از 0 دقیقه باشد',
            });
          }
        }),
        durationExecution: zod.number().superRefine(async (durationExecution, { addIssue }) => {
          if (durationExecution < 1) {
            addIssue({
              code: 'custom',
              message: 'مدت زمان اجرا نمیتواند کمتر از 1 دقیقه باشد',
            });
          }
        }),
        numberOfOutputParts: zod.number().superRefine(async (numberOfOutputParts, { addIssue }) => {
          if (numberOfOutputParts < 1) {
            addIssue({
              code: 'custom',
              message: 'تعداد قطعات خروجی نمیتواند کمتر از 1 عدد باشد',
            });
          }
        }),
        numberOfSetups: zod.number().superRefine(async (numberOfSetups, { addIssue }) => {
          if (numberOfSetups < 0) {
            addIssue({
              code: 'custom',
              message: 'تعداد راه اندازی ها نمیتواند کمتر از 0 باشد',
            });
          }
        }),
        efficiencyEstimated: zod.number().superRefine(async (efficiencyEstimated, { addIssue }) => {
          if (efficiencyEstimated < 0 || efficiencyEstimated > 1) {
            addIssue({
              code: 'custom',
              message: 'بازدهی تخمین زده شده باید بین 0 تا 1 باشد',
            });
          }
        }),
      })
      .strict();
  },
  get create() {
    return this.base;
  },
  get update() {
    return zod
      .object({
        id: zod.string().superRefine(async (id, { addIssue }) => {
          const projectStageScheduleMetadataExists = await prisma.projectStageScheduleMetadata.exists({
            id,
          });
          if (!projectStageScheduleMetadataExists) {
            addIssue({
              code: 'custom',
              message: 'متادیتای مرحله ی مورد نظر یافت نشد',
            });
          }
        }),
        data: inspectors.base.partial(),
      })
      .strict();
  },
};

export default inspectors;
