import { ZodNaN, ZodObject, ZodRawShape, ZodType, ZodTypeDef, z as zod } from 'zod';
import validator from 'validator';
import { ClientService } from '@services';
import { ClientInputCreate, ClientInputUpdate } from 'src/codegen/graphql';

export const validateClientCreate: ZodObject<ZodRawShape, 'strict', zod.ZodTypeAny, ClientInputCreate> = zod
  .object({
    name: zod
      .string()
      .transform((data) => {
        return data.trim();
      })
      .superRefine(async (name, { addIssue, path }) => {
        if (!validator.isLength(name, { min: 2, max: 256 })) {
          addIssue({
            code: 'custom',
            message: 'نام مشتری باید حداقل 2 و حداکثر 256 حرف داشته باشد',
            path,
          });
        }
        if (!validator.matches(name, /^[a-zA-Z0-9\u0600-\u06FF\s_-]+$/)) {
          addIssue({
            code: 'custom',
            message: 'نام مشتری باید فقط شامل حروف انگلیسی، فارسی، اعداد، فاصله، خط تیره و زیرخط باشد',
            path,
          });
        }
        const nameIsNotUnique = await ClientService.exists({
          name,
        });
        if (nameIsNotUnique) {
          addIssue({
            code: 'custom',
            message: 'نام مشتری نمیتواند تکراری باشد',
            path,
          });
        }
      }),
  })
  .strict();

export const validateClientUpdate: ZodObject<
  ZodRawShape,
  'strict',
  zod.ZodTypeAny,
  { id: string; data: ClientInputUpdate }
> = zod
  .object({
    id: zod.string().superRefine(async (id, { addIssue, path }) => {
      const clientIdIsInvalid = !(await ClientService.exists({
        id,
      }));
      if (clientIdIsInvalid) {
        addIssue({
          code: 'custom',
          message: 'مشتری مورد نظر یافت نشد',
          path,
        });
      }
    }),
    data: validateClientCreate.strict().partial(),
  })
  .strict();

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
