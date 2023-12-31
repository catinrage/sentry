import zod from 'zod';
import validator from 'validator';
import prisma from '@prisma';
import { InspectorType } from '@types';
import { ProjectInputCreate, ProjectInputUpdate } from 'src/codegen/graphql';

export const inspectors: InspectorType<ProjectInputCreate, ProjectInputUpdate> = {
  get base() {
    return zod
      .object({
        code: zod
          .string()
          .transform((data) => {
            return data.trim();
          })
          .superRefine(async (code, { addIssue }) => {
            if (!validator.isLength(code, { min: 3, max: 256 })) {
              addIssue({
                code: 'custom',
                message: 'کد پروژه باید حداقل 3 و حداکثر 256 حرف داشته باشد',
              });
              return zod.NEVER;
            }
            if (!validator.matches(code, /^[a-zA-Z0-9_-]+$/)) {
              addIssue({
                code: 'custom',
                message: 'کد پروژه باید فقط شامل حروف انگلیسی، اعداد، خط تیره و زیرخط باشد',
              });
              return zod.NEVER;
            }
            const codeIsNotUnique = await prisma.project.exists({
              code,
            });
            if (codeIsNotUnique) {
              addIssue({
                code: 'custom',
                message: 'کد پروژه نمیتواند تکراری باشد',
              });
              return zod.NEVER;
            }
          }),
        clientId: zod.string().superRefine(async (clientId, { addIssue }) => {
          const clientIdIsInvalid = !(await prisma.client.exists({
            id: clientId,
          }));
          if (clientIdIsInvalid) {
            addIssue({
              code: 'custom',
              message: 'شناسه مشتری نامعتبر است',
            });
            return zod.NEVER;
          }
        }),
        title: zod
          .string()
          .transform((data) => {
            return data.trim();
          })
          .superRefine(async (title, { addIssue }) => {
            if (!validator.isLength(title, { min: 3, max: 256 })) {
              addIssue({
                code: 'custom',
                message: 'عنوان پروژه باید حداقل 3 و حداکثر 256 حرف داشته باشد',
              });
              return zod.NEVER;
            }
            if (!validator.matches(title, /^[a-zA-Z0-9\u0600-\u06FF\s_\-.]+$/)) {
              addIssue({
                code: 'custom',
                message:
                  'عنوان پروژه باید فقط شامل حروف انگلیسی، فارسی، اعداد، فاصله، خط تیره، زیرخط و نقطه باشد',
              });
              return zod.NEVER;
            }
          }),
        quantity: zod
          .number()
          .transform((data) => {
            return Number(data);
          })
          .superRefine(async (quantity, { addIssue }) => {
            if (!validator.isInt(String(quantity), { min: 1, max: 10000000 })) {
              addIssue({
                code: 'custom',
                message: 'تعداد پروژه باید حداقل 1 و حداکثر 10000000 عدد باشد',
              });
              return zod.NEVER;
            }
          }),
        fee: zod
          .number()
          .transform((data) => {
            return Number(data);
          })
          .superRefine(async (fee, { addIssue }) => {
            if (!validator.isInt(String(fee), { min: 1 })) {
              addIssue({
                code: 'custom',
                message: 'مبلغ هر محصول باید حداقل 1 ریال باشد',
              });
              return zod.NEVER;
            }
          }),
        dueDate: zod.date().optional(),
        description: zod
          .string()
          .transform((data) => {
            return data.trim();
          })
          .superRefine(async (description, { addIssue }) => {
            if (!validator.isLength(description, { max: 2048 })) {
              addIssue({
                code: 'custom',
                message: 'توضیحات پروژه بیش از حد طولانی است',
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
        id: zod.string().superRefine(async (id, { addIssue }) => {
          const projectIdIsInvalid = !(await prisma.project.exists({
            id,
          }));
          if (projectIdIsInvalid) {
            addIssue({
              code: 'custom',
              message: 'پروژه ی مورد نظر یافت نشد',
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
        id: zod.string().superRefine(async (id, { addIssue }) => {
          const projectIdIsInvalid = !(await prisma.project.exists({
            id,
          }));
          if (projectIdIsInvalid) {
            addIssue({
              code: 'custom',
              message: 'پروژه ی مورد نظر یافت نشد',
            });
            return zod.NEVER;
          }
        }),
      })
      .strict();
  },
  extends: {
    Client: {
      delete: zod
        .object({
          id: zod.string().superRefine(async (id, { addIssue }) => {
            const clientHasAnyProject = await prisma.project.count({
              where: {
                clientId: id,
              },
            });
            if (clientHasAnyProject) {
              addIssue({
                code: 'custom',
                message: 'نمیتوانید این مشتری را حذف کنید, حداقل یک پروژه برای این مشتری ثبت شده است',
              });
              return zod.NEVER;
            }
          }),
        })
        .strict(),
    },
  },
};

export default inspectors;
