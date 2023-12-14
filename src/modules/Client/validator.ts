import { z as zod } from 'zod';
import { ClientService } from '@services';

export const validateClientCreate = zod.object({
  name: zod
    .string()
    .min(2, { message: 'نام مشتری باید حداقل 2 حرف داشته باشد' })
    .max(255, { message: 'نام مشتری باید حداکثر 255 حرف داشته باشد' })
    .regex(/^[a-zA-Z0-9\u0600-\u06FF\s_-]+$/, {
      message: 'نام مشتری باید فقط شامل حروف انگلیسی، فارسی، اعداد، فاصله، خط تیره و زیرخط باشد',
    })
    .refine(
      async (name) => {
        return !(await ClientService.exists({
          name,
        }));
      },
      {
        message: 'نام مشتری نمیتواند تکراری باشد, یک مشتری با این نام ثبت شده است',
      },
    ),
});

export const validateClientUpdate = zod.object({
  id: zod.string().refine(
    async (id) => {
      return await ClientService.exists({
        id,
      });
    },
    {
      message: 'مشتری مورد نظر یافت نشد',
    },
  ),
  data: validateClientCreate.partial(),
});

export const validateClientDelete = zod.object({
  id: zod
    .string()
    .refine(
      async (id) => {
        return await ClientService.exists({
          id,
        });
      },
      {
        message: 'مشتری مورد نظر یافت نشد',
      },
    )
    .refine(
      async (id) => {
        return !(await ClientService.hasAnyProjects(id));
      },
      {
        message: 'نمیتوانید این مشتری را حذف کنید, حداقل یک پروژه برای این مشتری ثبت شده است',
      },
    ),
});
