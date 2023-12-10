import { prisma } from '@providers';
import { z as zod } from 'zod';

async function isAUniqueCombinationOfClientIdAndTitle({
  clientId,
  title,
}: {
  clientId: string;
  title: string;
}) {
  return !(await prisma.project.findUnique({
    where: {
      clientId_title: {
        clientId,
        title,
      },
    },
  }));
}

async function isAUniqueProjectCode(code: string) {
  return !(await prisma.project.findUnique({
    where: {
      code,
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

async function projectWithThisIdExists(id: string) {
  return await prisma.project.findUnique({
    where: {
      id,
    },
  });
}

export const projectCreateInputSchemaBase = zod.object({
  code: zod
    .string()
    .min(3, { message: 'کد پروژه باید حداقل 3 حرف داشته باشد' })
    .max(255, {
      message: 'کد پروژه باید حداکثر 255 حرف داشته باشد',
    })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: 'کد پروژه باید فقط شامل حروف انگلیسی، اعداد، خط تیره و زیرخط باشد',
    })
    .refine(isAUniqueProjectCode, {
      message: 'کد پروژه نمیتواند تکراری باشد, یک پروژه با این کد ثبت شده است',
    }),
  client: zod.object({
    connect: zod.object({
      id: zod.string().min(1, { message: 'شناسه مشتری نامعتبر است' }).refine(clientWithThisIdExists, {
        message: 'مشتری مورد نظر یافت نشد',
      }),
    }),
  }),
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
});

export const projectCreateInputSchema = projectCreateInputSchemaBase.refine(
  async (data) => {
    const isUnique = await isAUniqueCombinationOfClientIdAndTitle({
      clientId: data.client.connect.id,
      title: data.title,
    });

    return isUnique;
  },
  {
    message: 'پروژه با این عنوان برای این مشتری قبلا ثبت شده است',
  },
);

export const projectUpdateInputSchema = projectCreateInputSchemaBase
  .partial()
  .extend({
    id: zod.string().min(1, { message: 'شناسه پروژه نامعتبر است' }).refine(projectWithThisIdExists, {
      message: 'پروژه مورد نظر یافت نشد',
    }),
  })
  .refine(
    async (data) => {
      if (data.client || data.title) {
        const project = await prisma.project.findUnique({
          where: {
            id: data.id,
          },
        });
        if (!project) return;
        const isUnique = await isAUniqueCombinationOfClientIdAndTitle({
          clientId: data.client?.connect.id || project.clientId,
          title: data.title || project.title,
        });
        return isUnique;
      }
      return true;
    },
    {
      message: 'پروژه با این عنوان برای این مشتری قبلا ثبت شده است',
    },
  );

export const projectDeleteInputSchema = zod.object({
  id: zod.string().min(1, { message: 'شناسه پروژه نامعتبر است' }).refine(projectWithThisIdExists, {
    message: 'پروژه مورد نظر یافت نشد',
  }),
});
