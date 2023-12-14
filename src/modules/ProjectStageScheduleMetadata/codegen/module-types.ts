/* eslint-disable */
import * as Types from "../../../codegen/graphql";
import * as gm from "graphql-modules";
export namespace ProjectStageScheduleMetadataModule {
  interface DefinedFields {
    ProjectStageScheduleMetadata: 'id' | 'durationSetup' | 'durationPreparation' | 'durationExecution' | 'numberOfOutputParts' | 'numberOfSetups' | 'efficiencyEstimated';
    ProjectStage: 'defaultMetadata';
    ProjectStageSchedule: 'metadata';
  };
  
  interface DefinedInputFields {
    ProjectStageScheduleMetadataInputCreate: 'durationSetup' | 'durationPreparation' | 'durationExecution' | 'numberOfOutputParts' | 'numberOfSetups' | 'efficiencyEstimated';
    ProjectStageScheduleMetadataInputUpdate: 'durationSetup' | 'durationPreparation' | 'durationExecution' | 'numberOfOutputParts' | 'numberOfSetups' | 'efficiencyEstimated';
    ProjectStageInputCreate: 'defaultMetadata';
    ProjectStageInputUpdate: 'defaultMetadata';
    ProjectStageScheduleInputCreate: 'metadata';
    ProjectStageScheduleInputUpdate: 'metadata';
  };
  
  export type ProjectStageScheduleMetadata = Pick<Types.ProjectStageScheduleMetadata, DefinedFields['ProjectStageScheduleMetadata']>;
  export type ProjectStage = Types.ProjectStage;
  export type ProjectStageInputCreate = Types.ProjectStageInputCreate;
  export type ProjectStageScheduleMetadataInputCreate = Pick<Types.ProjectStageScheduleMetadataInputCreate, DefinedInputFields['ProjectStageScheduleMetadataInputCreate']>;
  export type ProjectStageInputUpdate = Types.ProjectStageInputUpdate;
  export type ProjectStageScheduleMetadataInputUpdate = Pick<Types.ProjectStageScheduleMetadataInputUpdate, DefinedInputFields['ProjectStageScheduleMetadataInputUpdate']>;
  export type ProjectStageSchedule = Types.ProjectStageSchedule;
  export type ProjectStageScheduleInputCreate = Types.ProjectStageScheduleInputCreate;
  export type ProjectStageScheduleInputUpdate = Types.ProjectStageScheduleInputUpdate;
  
  export type ProjectStageScheduleMetadataResolvers = Pick<Types.ProjectStageScheduleMetadataResolvers, DefinedFields['ProjectStageScheduleMetadata'] | '__isTypeOf'>;
  export type ProjectStageResolvers = Pick<Types.ProjectStageResolvers, DefinedFields['ProjectStage']>;
  export type ProjectStageScheduleResolvers = Pick<Types.ProjectStageScheduleResolvers, DefinedFields['ProjectStageSchedule']>;
  
  export interface Resolvers {
    ProjectStageScheduleMetadata?: ProjectStageScheduleMetadataResolvers;
    ProjectStage?: ProjectStageResolvers;
    ProjectStageSchedule?: ProjectStageScheduleResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    ProjectStageScheduleMetadata?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      durationSetup?: gm.Middleware[];
      durationPreparation?: gm.Middleware[];
      durationExecution?: gm.Middleware[];
      numberOfOutputParts?: gm.Middleware[];
      numberOfSetups?: gm.Middleware[];
      efficiencyEstimated?: gm.Middleware[];
    };
    ProjectStage?: {
      '*'?: gm.Middleware[];
      defaultMetadata?: gm.Middleware[];
    };
    ProjectStageSchedule?: {
      '*'?: gm.Middleware[];
      metadata?: gm.Middleware[];
    };
  };
}