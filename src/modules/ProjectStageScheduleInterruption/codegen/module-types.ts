/* eslint-disable */
import * as Types from "../../../codegen/graphql";
import * as gm from "graphql-modules";
export namespace ProjectStageScheduleInterruptionModule {
  interface DefinedFields {
    ProjectStageScheduleInterruption: 'id' | 'dateStart' | 'dateEnd' | 'reason';
    ProjectStageSchedule: 'interruptions';
  };
  
  interface DefinedInputFields {
    ProjectStageScheduleInterruptionInputCreate: 'projectStageScheduleId' | 'dateStart' | 'dateEnd' | 'reason';
    ProjectStageScheduleInterruptionInputUpdate: 'dateStart' | 'dateEnd' | 'reason';
  };
  
  export type ProjectStageScheduleInterruption = Pick<Types.ProjectStageScheduleInterruption, DefinedFields['ProjectStageScheduleInterruption']>;
  export type DateTime = Types.DateTime;
  export type ProjectStageSchedule = Types.ProjectStageSchedule;
  export type ProjectStageScheduleInterruptionInputCreate = Pick<Types.ProjectStageScheduleInterruptionInputCreate, DefinedInputFields['ProjectStageScheduleInterruptionInputCreate']>;
  export type ProjectStageScheduleInterruptionInputUpdate = Pick<Types.ProjectStageScheduleInterruptionInputUpdate, DefinedInputFields['ProjectStageScheduleInterruptionInputUpdate']>;
  
  export type ProjectStageScheduleInterruptionResolvers = Pick<Types.ProjectStageScheduleInterruptionResolvers, DefinedFields['ProjectStageScheduleInterruption'] | '__isTypeOf'>;
  export type ProjectStageScheduleResolvers = Pick<Types.ProjectStageScheduleResolvers, DefinedFields['ProjectStageSchedule']>;
  
  export interface Resolvers {
    ProjectStageScheduleInterruption?: ProjectStageScheduleInterruptionResolvers;
    ProjectStageSchedule?: ProjectStageScheduleResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    ProjectStageScheduleInterruption?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      dateStart?: gm.Middleware[];
      dateEnd?: gm.Middleware[];
      reason?: gm.Middleware[];
    };
    ProjectStageSchedule?: {
      '*'?: gm.Middleware[];
      interruptions?: gm.Middleware[];
    };
  };
}