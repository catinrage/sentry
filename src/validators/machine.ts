import { z as zod } from 'zod';
import services from '@services';
import { prisma } from '@providers';

/**
 * Checks if the given machine name is unique.
 * @param name - The name of the machine to check.
 * @returns A boolean indicating whether the machine name is unique or not.
 */
async function isMachineNameUnique(name: string) {
  const machine = await services.machine.findUnique({
    name,
  });
  prisma.$disconnect();
  return !machine;
}

/**
 * Checks if a machine ID is valid.
 * @param id - The machine ID to validate.
 * @returns A Promise that resolves to the machine object if the ID is valid, or null otherwise.
 */
async function isMachineIdValid(id: string) {
  const machine = await services.machine.findUnique({
    id,
  });
  prisma.$disconnect();
  return machine;
}

export const machineCreateInputSchema = zod.object({
  name: zod
    .string()
    .min(3, { message: 'نام ماشین باید حداقل 3 حرف داشته باشد' })
    .max(255, { message: 'نام ماشین باید حداکثر 255 حرف داشته باشد' })
    .regex(/^[a-zA-Z0-9\u0600-\u06FF\s_-]+$/, {
      message: 'نام ماشین باید فقط شامل حروف انگلیسی، فارسی، اعداد، فاصله، خط تیره و زیرخط باشد',
    })
    // This is a custom refinement function that checks if the machine name is unique.
    .refine(isMachineNameUnique, {
      message: 'نام ماشین نمیتواند تکراری باشد, یک ماشین با این نام ثبت شده است',
    }),
});

export const machineUpdateInputSchema = machineCreateInputSchema.partial().extend({
  id: zod.string().min(1, { message: 'شناسه ماشین نامعتبر است' }).refine(isMachineIdValid, {
    message: 'ماشین مورد نظر یافت نشد',
  }),
});

export const machineDeleteInputSchema = zod.object({
  id: zod.string().min(1, { message: 'شناسه ماشین نامعتبر است' }).refine(isMachineIdValid, {
    message: 'ماشین مورد نظر یافت نشد',
  }),
});
