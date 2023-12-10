/* eslint-disable */
import * as Types from "../../../codegen/graphql";
import * as gm from "graphql-modules";
export namespace ClientModule {
  interface DefinedFields {
    Client: 'id' | 'name' | 'createdAt' | 'updatedAt';
    Query: 'client' | 'clients';
    Mutation: 'clientCreate' | 'clientUpdate' | 'clientDelete';
    Project: 'client';
  };
  
  interface DefinedInputFields {
    ClientInputCreate: 'name';
    ClientInputUpdate: 'name';
    ProjectInputCreate: 'clientId';
    ProjectInputUpdate: 'clientId';
  };
  
  export type Client = Pick<Types.Client, DefinedFields['Client']>;
  export type DateTime = Types.DateTime;
  export type Project = Types.Project;
  export type ProjectInputCreate = Types.ProjectInputCreate;
  export type ProjectInputUpdate = Types.ProjectInputUpdate;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type ClientInputCreate = Pick<Types.ClientInputCreate, DefinedInputFields['ClientInputCreate']>;
  export type ClientInputUpdate = Pick<Types.ClientInputUpdate, DefinedInputFields['ClientInputUpdate']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type MutationResponse = Types.MutationResponse;
  
  export type ClientResolvers = Pick<Types.ClientResolvers, DefinedFields['Client'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type ProjectResolvers = Pick<Types.ProjectResolvers, DefinedFields['Project']>;
  
  export interface Resolvers {
    Client?: ClientResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Project?: ProjectResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Client?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    Project?: {
      '*'?: gm.Middleware[];
      client?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      client?: gm.Middleware[];
      clients?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      clientCreate?: gm.Middleware[];
      clientUpdate?: gm.Middleware[];
      clientDelete?: gm.Middleware[];
    };
  };
}