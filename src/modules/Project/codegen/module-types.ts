/* eslint-disable */
import * as Types from "../../../codegen/graphql";
import * as gm from "graphql-modules";
export namespace ProjectModule {
  interface DefinedFields {
    Project: 'id' | 'code' | 'title' | 'quantity' | 'fee' | 'dueDate' | 'client' | 'createdAt' | 'updatedAt';
    Query: 'project' | 'projects';
    Mutation: 'projectCreate' | 'projectUpdate' | 'projectDelete';
    Client: 'projects';
  };
  
  interface DefinedInputFields {
    ProjectInputCreate: 'code' | 'title' | 'quantity' | 'fee' | 'dueDate' | 'clientId';
    ProjectInputUpdate: 'code' | 'title' | 'quantity' | 'fee' | 'dueDate' | 'clientId';
  };
  
  export type Project = Pick<Types.Project, DefinedFields['Project']>;
  export type DateTime = Types.DateTime;
  export type Client = Types.Client;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type ProjectInputCreate = Pick<Types.ProjectInputCreate, DefinedInputFields['ProjectInputCreate']>;
  export type ProjectInputUpdate = Pick<Types.ProjectInputUpdate, DefinedInputFields['ProjectInputUpdate']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type MutationResponse = Types.MutationResponse;
  
  export type ProjectResolvers = Pick<Types.ProjectResolvers, DefinedFields['Project'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type ClientResolvers = Pick<Types.ClientResolvers, DefinedFields['Client']>;
  
  export interface Resolvers {
    Project?: ProjectResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Client?: ClientResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Project?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      code?: gm.Middleware[];
      title?: gm.Middleware[];
      quantity?: gm.Middleware[];
      fee?: gm.Middleware[];
      dueDate?: gm.Middleware[];
      client?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    Client?: {
      '*'?: gm.Middleware[];
      projects?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      project?: gm.Middleware[];
      projects?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      projectCreate?: gm.Middleware[];
      projectUpdate?: gm.Middleware[];
      projectDelete?: gm.Middleware[];
    };
  };
}