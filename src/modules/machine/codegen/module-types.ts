/* eslint-disable */
import * as Types from "../../../codegen/graphql";
import * as gm from "graphql-modules";
export namespace MachineModule {
  interface DefinedFields {
    Machine: 'id' | 'name';
    Query: 'machine' | 'machines';
    MachineMutationResponse: 'success' | 'errors' | 'machine';
    Mutation: 'machineCreate' | 'machineUpdate' | 'machineDelete';
  };
  
  interface DefinedInputFields {
    MachineInputCreate: 'name';
    MachineInputUpdate: 'name';
  };
  
  export type Machine = Pick<Types.Machine, DefinedFields['Machine']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type MachineInputCreate = Pick<Types.MachineInputCreate, DefinedInputFields['MachineInputCreate']>;
  export type MachineInputUpdate = Pick<Types.MachineInputUpdate, DefinedInputFields['MachineInputUpdate']>;
  export type MachineMutationResponse = Pick<Types.MachineMutationResponse, DefinedFields['MachineMutationResponse']>;
  export type Error = Types.Error;
  export type MutationResponse = Types.MutationResponse;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  
  export type MachineResolvers = Pick<Types.MachineResolvers, DefinedFields['Machine'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MachineMutationResponseResolvers = Pick<Types.MachineMutationResponseResolvers, DefinedFields['MachineMutationResponse'] | '__isTypeOf'>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  
  export interface Resolvers {
    Machine?: MachineResolvers;
    Query?: QueryResolvers;
    MachineMutationResponse?: MachineMutationResponseResolvers;
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
    };
    Query?: {
      '*'?: gm.Middleware[];
      machine?: gm.Middleware[];
      machines?: gm.Middleware[];
    };
    MachineMutationResponse?: {
      '*'?: gm.Middleware[];
      success?: gm.Middleware[];
      errors?: gm.Middleware[];
      machine?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      machineCreate?: gm.Middleware[];
      machineUpdate?: gm.Middleware[];
      machineDelete?: gm.Middleware[];
    };
  };
}