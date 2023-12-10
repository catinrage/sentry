import { z as zod } from 'zod';
import { MachineTypeEnum } from '@prisma/client';
import { prisma } from '@providers';

async function isAUniqueMachineName(name: string) {
  return !(await prisma.machine.findUnique({
    where: {
      name,
    },
  }));
}

async function machineWithThisIdExists(id: string) {
  return await prisma.machine.findUnique({
    where: {
      id,
    },
  });
}

export const machineCreateInputSchema = zod.object({
  name: zod
    .string()
    .min(3, { message: 'نام ماشین باید حداقل 3 حرف داشته باشد' })
    .max(255, { message: 'نام ماشین باید حداکثر 255 حرف داشته باشد' })
    .regex(/^[a-zA-Z0-9\u0600-\u06FF\s_-]+$/, {
      message: 'نام ماشین باید فقط شامل حروف انگلیسی، فارسی، اعداد، فاصله، خط تیره و زیرخط باشد',
    })
    .refine(isAUniqueMachineName, {
      message: 'نام ماشین نمیتواند تکراری باشد, یک ماشین با این نام ثبت شده است',
    }),
  type: zod.nativeEnum(MachineTypeEnum, {
    errorMap: () => ({ message: 'نوع ماشین معتبر نیست' }),
  }),
  available: zod.boolean(),
});

export const machineUpdateInputSchema = machineCreateInputSchema.partial().extend({
  id: zod.string().min(1, { message: 'شناسه ماشین نامعتبر است' }).refine(machineWithThisIdExists, {
    message: 'ماشین مورد نظر یافت نشد',
  }),
});

export const machineDeleteInputSchema = zod.object({
  id: zod.string().min(1, { message: 'شناسه ماشین نامعتبر است' }).refine(machineWithThisIdExists, {
    message: 'ماشین مورد نظر یافت نشد',
  }),
});
