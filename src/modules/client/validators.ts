import { z as zod } from 'zod';
import { prisma } from '@providers';

async function isAUniqueClientName(name: string) {
  return !(await prisma.client.findUnique({
    where: {
      name,
    },
  }));
}

async function clientWithThisIdExists(id: string) {
  return await prisma.client.findUnique({
    where: {
      id,
    },
  });
}

export const clientCreateInputSchema = zod.object({
  name: zod
    .string()
    .min(3, { message: 'نام مشتری باید حداقل 3 حرف داشته باشد' })
    .max(255, { message: 'نام مشتری باید حداکثر 255 حرف داشته باشد' })
    .regex(/^[a-zA-Z0-9\u0600-\u06FF\s_-]+$/, {
      message: 'نام مشتری باید فقط شامل حروف انگلیسی، فارسی، اعداد، فاصله، خط تیره و زیرخط باشد',
    })
    .refine(isAUniqueClientName, {
      message: 'نام مشتری نمیتواند تکراری باشد, یک مشتری با این نام ثبت شده است',
    }),
});

export const clientUpdateInputSchema = clientCreateInputSchema.partial().extend({
  id: zod.string().min(1, { message: 'شناسه مشتری نامعتبر است' }).refine(clientWithThisIdExists, {
    message: 'مشتری مورد نظر یافت نشد',
  }),
});

export const deleteClientInputSchema = zod.object({
  id: zod.string().min(1, { message: 'شناسه مشتری نامعتبر است' }).refine(clientWithThisIdExists, {
    message: 'مشتری مورد نظر یافت نشد',
  }),
});
