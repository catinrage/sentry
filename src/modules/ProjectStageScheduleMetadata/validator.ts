import { z as zod } from 'zod';

export const validateProjectStageScheduleMetadataCreate = zod.object({
  durationSetup: zod.number().min(0, { message: 'مدت زمان راه اندازی نمیتواند کمتر از 0 دقیقه باشد' }),
  durationPreparation: zod.number().min(0, { message: 'مدت زمان آماده سازی نمیتواند کمتر از 0 دقیقه باشد' }),
  durationExecution: zod.number().min(1, { message: 'مدت زمان اجرا نمیتواند کمتر از 1 دقیقه باشد' }),
  numberOfOutputParts: zod.number().min(1, { message: 'تعداد قطعات خروجی نمیتواند کمتر از 1 عدد باشد' }),
  numberOfSetups: zod.number().min(0, { message: 'تعداد راه اندازی ها نمیتواند کمتر از 0 باشد' }),
  efficiencyEstimated: zod
    .number()
    .min(0, { message: 'بازدهی تخمین زده شده نمیتواند کمتر از 0 باشد' })
    .max(1, { message: 'بازدهی تخمین زده شده نمیتواند بیشتر از 1 باشد' }),
});
