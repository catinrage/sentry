import { z as zod } from 'zod';
import { ProjectStageService, ProjectService } from '@services';
import { validateProjectStageScheduleMetadataCreate } from '../ProjectStageScheduleMetadata/validator';

export const validateProjectStageCreate = zod.object({
  projectId: zod.string().refine(
    async (projectId) => {
      return await ProjectService.exists({
        id: projectId,
      });
    },
    {
      message: 'پروژه مورد نظر یافت نشد',
    },
  ),
  title: zod.string().max(255, { message: 'عنوان مرحله بیش از حد طولانی است' }).optional(),
  defaultMetadata: validateProjectStageScheduleMetadataCreate,
});

export const validateProjectStageUpdate = zod.object({
  id: zod.string().refine(
    async (id) => {
      return await ProjectStageService.exists({
        id,
      });
    },
    {
      message: 'مرحله ی مورد نظر یافت نشد',
    },
  ),
  data: validateProjectStageCreate.partial(),
});

export const validateProjectStageDelete = zod.object({
  id: zod
    .string()
    .refine(
      async (id) => {
        return await ProjectStageService.exists({
          id,
        });
      },
      {
        message: 'مرحله ی مورد نظر یافت نشد',
      },
    )
    .refine(
      async (id) => {
        return !(await ProjectStageService.hasAnySchedules(id));
      },
      {
        message: 'نمیتوانید این مرحله را حذف کنید, حداقل یک زمانبندی برای این مرحله ثبت شده است',
      },
    ),
});
