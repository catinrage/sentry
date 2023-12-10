/* eslint-disable */
import * as Types from "../../../codegen/graphql";
import * as gm from "graphql-modules";
export namespace MachineModule {
  interface DefinedFields {
    Machine: 'id' | 'name' | 'type' | 'available' | 'createdAt' | 'updatedAt';
    Query: 'machine' | 'machines';
    Mutation: 'machineCreate' | 'machineUpdate' | 'machineDelete';
  };
  
  interface DefinedEnumValues {
    MachineTypeEnum: 'CNC_MILLING' | 'CNC_TURNING' | 'CNC_WIRECUT';
  };
  
  interface DefinedInputFields {
    MachineInputCreate: 'name' | 'type' | 'available';
    MachineInputUpdate: 'name' | 'type' | 'available';
  };
  
  export type MachineTypeEnum = DefinedEnumValues['MachineTypeEnum'];
  export type Machine = Pick<Types.Machine, DefinedFields['Machine']>;
  export type DateTime = Types.DateTime;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type MachineInputCreate = Pick<Types.MachineInputCreate, DefinedInputFields['MachineInputCreate']>;
  export type MachineInputUpdate = Pick<Types.MachineInputUpdate, DefinedInputFields['MachineInputUpdate']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type MutationResponse = Types.MutationResponse;
  
  export type MachineResolvers = Pick<Types.MachineResolvers, DefinedFields['Machine'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  
  export interface Resolvers {
    Machine?: MachineResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Machine?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
      type?: gm.Middleware[];
      available?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      machine?: gm.Middleware[];
      machines?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      machineCreate?: gm.Middleware[];
      machineUpdate?: gm.Middleware[];
      machineDelete?: gm.Middleware[];
    };
  };
}