/* eslint-disable */
import * as Types from "../../../codegen/graphql";
import * as gm from "graphql-modules";
export namespace ClientModule {
  interface DefinedFields {
    Client: 'id' | 'name';
    Query: 'client' | 'clients';
    ClientMutationResponse: 'success' | 'errors' | 'client';
    Mutation: 'clientCreate' | 'clientUpdate' | 'clientDelete';
  };
  
  interface DefinedInputFields {
    ClientInputCreate: 'name';
    ClientInputUpdate: 'name';
  };
  
  export type Client = Pick<Types.Client, DefinedFields['Client']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type ClientInputCreate = Pick<Types.ClientInputCreate, DefinedInputFields['ClientInputCreate']>;
  export type ClientInputUpdate = Pick<Types.ClientInputUpdate, DefinedInputFields['ClientInputUpdate']>;
  export type ClientMutationResponse = Pick<Types.ClientMutationResponse, DefinedFields['ClientMutationResponse']>;
  export type Error = Types.Error;
  export type MutationResponse = Types.MutationResponse;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  
  export type ClientResolvers = Pick<Types.ClientResolvers, DefinedFields['Client'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type ClientMutationResponseResolvers = Pick<Types.ClientMutationResponseResolvers, DefinedFields['ClientMutationResponse'] | '__isTypeOf'>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  
  export interface Resolvers {
    Client?: ClientResolvers;
    Query?: QueryResolvers;
    ClientMutationResponse?: ClientMutationResponseResolvers;
    Mutation?: MutationResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Client?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      client?: gm.Middleware[];
      clients?: gm.Middleware[];
    };
    ClientMutationResponse?: {
      '*'?: gm.Middleware[];
      success?: gm.Middleware[];
      errors?: gm.Middleware[];
      client?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      clientCreate?: gm.Middleware[];
      clientUpdate?: gm.Middleware[];
      clientDelete?: gm.Middleware[];
    };
  };
}