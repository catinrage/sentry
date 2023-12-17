/* eslint-disable */
import * as Types from "../../../codegen/graphql";
import * as gm from "graphql-modules";
export namespace ProjectStageScheduleModule {
  interface DefinedFields {
    ProjectStageSchedule: 'id' | 'dateStartFixed' | 'dateStart' | 'dateEndEstimated' | 'dateEndActual' | 'dateEnd' | 'quantity' | 'state' | 'next' | 'previous' | 'machine' | 'stage' | 'createdAt' | 'updatedAt';
    Mutation: 'projectStageScheduleCreate' | 'projectStageScheduleUpdate' | 'projectStageScheduleDelete';
    Machine: 'schedules';
    ProjectStage: 'schedules';
  };
  
  interface DefinedEnumValues {
    ProjectStageScheduleStateEnum: 'PENDING' | 'IN_PROGRESS' | 'PAUSED' | 'COMPLETED';
  };
  
  interface DefinedInputFields {
    ProjectStageScheduleInputCreate: 'dateStartFixed' | 'quantity' | 'state' | 'previousId' | 'machineId' | 'stageId';
    ProjectStageScheduleInputUpdate: 'dateStartFixed' | 'quantity' | 'state' | 'previousId' | 'machineId';
  };
  
  export type ProjectStageScheduleStateEnum = DefinedEnumValues['ProjectStageScheduleStateEnum'];
  export type ProjectStageSchedule = Pick<Types.ProjectStageSchedule, DefinedFields['ProjectStageSchedule']>;
  export type DateTime = Types.DateTime;
  export type Machine = Types.Machine;
  export type ProjectStage = Types.ProjectStage;
  export type ProjectStageScheduleInputCreate = Pick<Types.ProjectStageScheduleInputCreate, DefinedInputFields['ProjectStageScheduleInputCreate']>;
  export type ProjectStageScheduleInputUpdate = Pick<Types.ProjectStageScheduleInputUpdate, DefinedInputFields['ProjectStageScheduleInputUpdate']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type MutationResponse = Types.MutationResponse;
  
  export type ProjectStageScheduleResolvers = Pick<Types.ProjectStageScheduleResolvers, DefinedFields['ProjectStageSchedule'] | '__isTypeOf'>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type MachineResolvers = Pick<Types.MachineResolvers, DefinedFields['Machine']>;
  export type ProjectStageResolvers = Pick<Types.ProjectStageResolvers, DefinedFields['ProjectStage']>;
  
  export interface Resolvers {
    ProjectStageSchedule?: ProjectStageScheduleResolvers;
    Mutation?: MutationResolvers;
    Machine?: MachineResolvers;
    ProjectStage?: ProjectStageResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    ProjectStageSchedule?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      dateStartFixed?: gm.Middleware[];
      dateStart?: gm.Middleware[];
      dateEndEstimated?: gm.Middleware[];
      dateEndActual?: gm.Middleware[];
      dateEnd?: gm.Middleware[];
      quantity?: gm.Middleware[];
      state?: gm.Middleware[];
      next?: gm.Middleware[];
      previous?: gm.Middleware[];
      machine?: gm.Middleware[];
      stage?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    Machine?: {
      '*'?: gm.Middleware[];
      schedules?: gm.Middleware[];
    };
    ProjectStage?: {
      '*'?: gm.Middleware[];
      schedules?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      projectStageScheduleCreate?: gm.Middleware[];
      projectStageScheduleUpdate?: gm.Middleware[];
      projectStageScheduleDelete?: gm.Middleware[];
    };
  };
}