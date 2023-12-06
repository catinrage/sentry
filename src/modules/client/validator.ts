import { z as zod } from 'zod';
import { ClientService } from './providers';
import { PrismaClient } from '@prisma/client';

/**
 * Checks if the given client name is unique.
 * @param name - The name of the client to check.
 * @returns A boolean indicating whether the client name is unique or not.
 */
async function isClientNameUnique(name: string) {
  const prisma = new PrismaClient();
  const clientService = new ClientService(prisma);
  const client = await clientService.findUnique({
    name,
  });
  prisma.$disconnect();
  return !client;
}

/**
 * Checks if a client ID is valid.
 * @param id - The client ID to validate.
 * @returns A Promise that resolves to the client object if the ID is valid, or null otherwise.
 */
async function isClientIdValid(id: string) {
  const prisma = new PrismaClient();
  const clientService = new ClientService(prisma);
  const client = await clientService.findUnique({
    id,
  });
  prisma.$disconnect();
  return client;
}

export const clientCreateInputSchema = zod.object({
  name: zod
    .string()
    .min(3, { message: 'نام مشتری باید حداقل 3 حرف داشته باشد' })
    .max(255, { message: 'نام مشتری باید حداکثر 255 حرف داشته باشد' })
    .regex(/^[a-zA-Z0-9\u0600-\u06FF\s_-]+$/, {
      message: 'نام مشتری باید فقط شامل حروف انگلیسی، فارسی، اعداد، فاصله، خط تیره و زیرخط باشد',
    })
    // This is a custom refinement function that checks if the client name is unique.
    .refine(isClientNameUnique, {
      message: 'نام مشتری نمیتواند تکراری باشد, یک مشتری با این نام ثبت شده است',
    }),
});

export const clientUpdateInputSchema = clientCreateInputSchema.partial().extend({
  id: zod.string().min(1, { message: 'شناسه مشتری نامعتبر است' }).refine(isClientIdValid, {
    message: 'مشتری مورد نظر یافت نشد',
  }),
});

export const deleteClientInputSchema = zod.object({
  id: zod.string().min(1, { message: 'شناسه مشتری نامعتبر است' }).refine(isClientIdValid, {
    message: 'مشتری مورد نظر یافت نشد',
  }),
});
