import zod from 'zod';
import validator from 'validator';
import prisma from '@prisma';
import { InspectorType } from '@types';
import { MachineInputCreate, MachineInputUpdate } from 'src/codegen/graphql';
import { MachineTypeEnum } from '@prisma/client';

const inspectors: InspectorType<MachineInputCreate, MachineInputUpdate> = {
  get base() {
    return zod
      .object({
        name: zod
          .string()
          .transform((data) => {
            return data.trim();
          })
          .superRefine(async (name, { addIssue }) => {
            if (!validator.isLength(name, { min: 2, max: 256 })) {
              addIssue({
                code: 'custom',
                message: 'نام ماشین باید حداقل 2 و حداکثر 256 حرف داشته باشد',
              });
              return zod.NEVER;
            }
            if (!validator.matches(name, /^[a-zA-Z0-9\u0600-\u06FF\s_-]+$/)) {
              addIssue({
                code: 'custom',
                message: 'نام ماشین باید فقط شامل حروف انگلیسی، فارسی، اعداد، فاصله، خط تیره و زیرخط باشد',
              });
              return zod.NEVER;
            }
            const nameIsNotUnique = await prisma.machine.exists({
              name,
            });
            if (nameIsNotUnique) {
              addIssue({
                code: 'custom',
                message: 'نام ماشین نمیتواند تکراری باشد',
              });
              return zod.NEVER;
            }
          }),
        type: zod.nativeEnum(MachineTypeEnum, {
          errorMap: () => ({ message: 'نوع ماشین معتبر نیست' }),
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
          const machineIdIsInvalid = !(await prisma.machine.exists({
            id,
          }));
          if (machineIdIsInvalid) {
            addIssue({
              code: 'custom',
              message: 'شناسه ماشین معتبر نیست',
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
          const machineIdIsInvalid = !(await prisma.machine.exists({
            id,
          }));
          if (machineIdIsInvalid) {
            addIssue({
              code: 'custom',
              message: 'شناسه ماشین معتبر نیست',
            });
            return zod.NEVER;
          }
        }),
      })
      .strict();
  },
};

export default inspectors;
