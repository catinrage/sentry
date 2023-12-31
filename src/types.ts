import { Prisma } from '@prisma/client';
import { ZodEffects, ZodObject, ZodRawShape, z as zod } from 'zod';
import { MutationResponse } from 'src/codegen/graphql';

export type ControllerType = {
  create(data: unknown): Promise<MutationResponse>;
  update(id: string, data: unknown): Promise<MutationResponse>;
  delete(id: string): Promise<MutationResponse>;
};

export type InspectorType<InputCreate, InputUpdate> = {
  /* 
    @why: 
    the reason im using base here is because in most cases create and input share the same shape (except for id in update),
    and update has data which is the same as create, but its partial, i can easily use this.create.partial, but here is the catch
    sometimes create has a SuperRefine at its end which is an Effect (zod thing) and does not have partial method, so i have to use
    a separate property `base`, which usually create is equal to and some times its a superRefined version of it.
  */
  base: ZodObject<ZodRawShape, 'strict', zod.ZodTypeAny, InputCreate>;
  create:
    | ZodObject<ZodRawShape, 'strict', zod.ZodTypeAny, InputCreate>
    | ZodEffects<ZodObject<ZodRawShape, 'strict', zod.ZodTypeAny, InputCreate>>;
  update?:
    | ZodObject<ZodRawShape, 'strict', zod.ZodTypeAny, { id: string; data: InputUpdate }>
    | ZodEffects<ZodObject<ZodRawShape, 'strict', zod.ZodTypeAny, { id: string; data: InputUpdate }>>;
  delete?:
    | ZodObject<ZodRawShape, 'strict', zod.ZodTypeAny, { id: string }>
    | ZodEffects<ZodObject<ZodRawShape, 'strict', zod.ZodTypeAny, { id: string }>>;
  extends?: {
    [K in Prisma.ModelName]?: {
      [action: string]:
        | ZodObject<ZodRawShape, 'strict', zod.ZodTypeAny>
        | ZodEffects<ZodObject<ZodRawShape, 'strict', zod.ZodTypeAny>>;
    };
  };
};
