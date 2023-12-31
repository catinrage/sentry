import zod from 'zod';
import validator from 'validator';
import prisma from '@prisma';
import { InspectorType } from '@types';
import { ClientInputCreate, ClientInputUpdate } from 'src/codegen/graphql';

const inspectors: InspectorType<ClientInputCreate, ClientInputUpdate> = {
  get base() {
    return zod
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
              });
              return zod.NEVER;
            }
            if (!validator.matches(name, /^[a-zA-Z0-9\u0600-\u06FF\s_-]+$/)) {
              addIssue({
                code: 'custom',
                message: 'نام مشتری باید فقط شامل حروف انگلیسی، فارسی، اعداد، فاصله، خط تیره و زیرخط باشد',
              });
              return zod.NEVER;
            }
            const nameIsNotUnique = await prisma.client.exists({
              name,
            });
            if (nameIsNotUnique) {
              addIssue({
                code: 'custom',
                message: 'نام مشتری نمیتواند تکراری باشد',
              });
              return zod.NEVER;
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
        id: zod.string().superRefine(async (id, { addIssue, path }) => {
          const clientIdIsInvalid = !(await prisma.client.exists({
            id,
          }));
          if (clientIdIsInvalid) {
            addIssue({
              code: 'custom',
              message: 'مشتری مورد نظر یافت نشد',
            });
            return zod.NEVER;
          }
        }),
        data: inspectors.base.partial(),
      })
      .strict();
  },
  get delete() {
    return zod
      .object({
        id: zod.string().superRefine(async (id, { addIssue, path }) => {
          const clientIdIsInvalid = !(await prisma.client.exists({
            id,
          }));
          if (clientIdIsInvalid) {
            addIssue({
              code: 'custom',
              message: 'مشتری مورد نظر یافت نشد',
            });
            return zod.NEVER;
          }
        }),
      })
      .strict();
  },
};

export default inspectors;
