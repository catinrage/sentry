import { z as zod } from 'zod';
import { ProjectService, ClientService } from '@services';

export const validateProjectCreate = zod.object({
  code: zod
    .string()
    .min(3, { message: 'کد پروژه باید حداقل 3 حرف داشته باشد' })
    .max(255, {
      message: 'کد پروژه باید حداکثر 255 حرف داشته باشد',
    })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: 'کد پروژه باید فقط شامل حروف انگلیسی، اعداد، خط تیره و زیرخط باشد',
    })
    .refine(
      async (code) => {
        return !(await ProjectService.exists({
          code,
        }));
      },
      {
        message: 'کد پروژه نمیتواند تکراری باشد, یک پروژه با این کد ثبت شده است',
      },
    ),
  clientId: zod
    .string()
    .min(1, { message: 'شناسه مشتری نامعتبر است' })
    .refine(
      async (clientId) => {
        return await ClientService.exists({
          id: clientId,
        });
      },
      {
        message: 'مشتری مورد نظر یافت نشد',
      },
    ),
  title: zod
    .string()
    .min(3, { message: 'عنوان پروژه باید حداقل 3 حرف داشته باشد' })
    .max(255, {
      message: 'عنوان پروژه باید حداکثر 255 حرف داشته باشد',
    })
    .regex(/^[a-zA-Z0-9\u0600-\u06FF\s_\-.]+$/, {
      message: 'عنوان پروژه باید فقط شامل حروف انگلیسی، فارسی، اعداد، فاصله، خط تیره، زیرخط و نقطه باشد',
    }),
  quantity: zod
    .number()
    .min(1, { message: 'تعداد پروژه باید حداقل 1 عدد باشد' })
    .max(10000000, { message: 'تعداد پروژه باید حداکثر 10000000 عدد باشد' })
    .int({ message: 'تعداد پروژه باید عدد صحیح باشد' }),
  fee: zod.number().min(1, { message: 'مبلغ هر محصوول باید حداقل 1 ریال باشد' }).optional(),
  dueDate: zod.date().optional(),
  description: zod.string().max(2048, { message: 'توضیحات پروژه بیش از حد طولانی است' }).optional(),
});

export const validateProjectUpdate = zod.object({
  id: zod.string().refine(
    async (id) => {
      return await ProjectService.exists({
        id,
      });
    },
    {
      message: 'پروژه ی مورد نظر یافت نشد',
    },
  ),
  data: validateProjectCreate.partial(),
});

export const validateProjectDelete = zod.object({
  id: zod
    .string()
    .refine(
      async (id) => {
        return await ProjectService.exists({
          id,
        });
      },
      {
        message: 'پروژه ی مورد نظر یافت نشد',
      },
    )
    .refine(
      async (id) => {
        return !(await ProjectService.hasAnyStages(id));
      },
      {
        message:
          'نمیتوانید این پروژه را حذف کنید, حداقل یک مرحله ی دارای زمانبندی برای این پروژه ثبت شده است',
      },
    ),
});
