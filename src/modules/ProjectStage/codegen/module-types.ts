/* eslint-disable */
import * as Types from "../../../codegen/graphql";
import * as gm from "graphql-modules";
export namespace ProjectStageModule {
  interface DefinedFields {
    ProjectStage: 'id' | 'number' | 'title' | 'project' | 'createdAt' | 'updatedAt';
    Mutation: 'projectStageCreate' | 'projectStageUpdate' | 'projectStageDelete' | 'projectReorderStages';
    Project: 'stages';
  };
  
  interface DefinedInputFields {
    ProjectStageInputCreate: 'title' | 'projectId';
    ProjectStageInputUpdate: 'title';
  };
  
  export type ProjectStage = Pick<Types.ProjectStage, DefinedFields['ProjectStage']>;
  export type Project = Types.Project;
  export type DateTime = Types.DateTime;
  export type ProjectStageInputCreate = Pick<Types.ProjectStageInputCreate, DefinedInputFields['ProjectStageInputCreate']>;
  export type ProjectStageInputUpdate = Pick<Types.ProjectStageInputUpdate, DefinedInputFields['ProjectStageInputUpdate']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type MutationResponse = Types.MutationResponse;
  
  export type ProjectStageResolvers = Pick<Types.ProjectStageResolvers, DefinedFields['ProjectStage'] | '__isTypeOf'>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type ProjectResolvers = Pick<Types.ProjectResolvers, DefinedFields['Project']>;
  
  export interface Resolvers {
    ProjectStage?: ProjectStageResolvers;
    Mutation?: MutationResolvers;
    Project?: ProjectResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    ProjectStage?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      number?: gm.Middleware[];
      title?: gm.Middleware[];
      project?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    Project?: {
      '*'?: gm.Middleware[];
      stages?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      projectStageCreate?: gm.Middleware[];
      projectStageUpdate?: gm.Middleware[];
      projectStageDelete?: gm.Middleware[];
      projectReorderStages?: gm.Middleware[];
    };
  };
}