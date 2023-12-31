import zod from 'zod';
import validator from 'validator';
import prisma from '@prisma';
import { InspectorType } from '@types';
import projectStageScheduleMetadataInspector from '../ProjectStageScheduleMetadata/inspector';
import { ProjectStageInputCreate, ProjectStageInputUpdate } from 'src/codegen/graphql';

export const inspectors: InspectorType<ProjectStageInputCreate, ProjectStageInputUpdate> = {
  get base() {
    return zod
      .object({
        projectId: zod.string().superRefine(async (projectId, { addIssue }) => {
          const projectIdIsInvalid = !(await prisma.project.exists({
            id: projectId,
          }));
          if (projectIdIsInvalid) {
            addIssue({
              code: 'custom',
              message: 'شناسه پروژه نامعتبر است',
            });
            return zod.NEVER;
          }
        }),
        defaultMetadata: projectStageScheduleMetadataInspector.create,
        title: zod
          .string()
          .transform((data) => {
            return data.trim();
          })
          .superRefine(async (title, { addIssue }) => {
            if (!validator.isLength(title, { min: 3, max: 256 })) {
              addIssue({
                code: 'custom',
                message: 'عنوان مرحله باید حداقل 3 و حداکثر 256 حرف داشته باشد',
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
          const idIsInvalid = !(await prisma.projectStage.exists({
            id,
          }));
          if (idIsInvalid) {
            addIssue({
              code: 'custom',
              message: 'شناسه مرحله نامعتبر است',
            });
            return zod.NEVER;
          }
        }),
        data: inspectors.base
          .omit({
            projectId: true,
          })
          .deepPartial(),
      })
      .strict();
  },
  get delete() {
    return zod
      .object({
        id: zod.string().superRefine(async (id, { addIssue }) => {
          const idIsInvalid = !(await prisma.projectStage.exists({
            id,
          }));
          if (idIsInvalid) {
            addIssue({
              code: 'custom',
              message: 'شناسه مرحله نامعتبر است',
            });
            return zod.NEVER;
          }
        }),
      })
      .strict();
  },
};

export default inspectors;
