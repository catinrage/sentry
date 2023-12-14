import { z as zod } from 'zod';
import { MachineService } from '@services';
import { MachineTypeEnum } from '@prisma/client';

export const validateMachineCreate = zod.object({
  name: zod
    .string()
    .min(3, { message: 'نام ماشین باید حداقل 3 حرف داشته باشد' })
    .max(255, { message: 'نام ماشین باید حداکثر 255 حرف داشته باشد' })
    .regex(/^[a-zA-Z0-9\u0600-\u06FF\s_-]+$/, {
      message: 'نام ماشین باید فقط شامل حروف انگلیسی، فارسی، اعداد، فاصله، خط تیره و زیرخط باشد',
    })
    .refine(
      async (name) => {
        return !(await MachineService.exists({
          name,
        }));
      },
      {
        message: 'نام ماشین نمیتواند تکراری باشد, یک ماشین با این نام ثبت شده است',
      },
    ),
  type: zod.nativeEnum(MachineTypeEnum, {
    errorMap: () => ({ message: 'نوع ماشین معتبر نیست' }),
  }),
  available: zod.boolean().optional(),
});

export const validateMachineUpdate = zod.object({
  id: zod.string().refine(
    async (id) => {
      return await MachineService.exists({
        id,
      });
    },
    {
      message: 'ماشین مورد نظر یافت نشد',
    },
  ),
  data: validateMachineCreate.partial(),
});

export const validateMachineDelete = zod.object({
  id: zod
    .string()
    .refine(
      async (id) => {
        return await MachineService.exists({
          id,
        });
      },
      {
        message: 'ماشین مورد نظر یافت نشد',
      },
    )
    .refine(
      async (id) => {
        return !(await MachineService.hasAnySchedules(id));
      },
      {
        message: 'نمیتوانید این ماشین را حذف کنید, حداقل یک زمانبندی برای این ماشین ثبت شده است',
      },
    ),
});
