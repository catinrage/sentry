/* eslint-disable */
import * as Types from "../../../codegen/graphql";
import * as gm from "graphql-modules";
export namespace _Module {
  interface DefinedFields {
    Query: 'ping';
    Mutation: '_empty';
    defaultErrorExtension: '_empty';
    BadInputErrorExtension: 'path';
    Error: 'code' | 'message' | 'extension';
    MutationResponse: 'success' | 'errors' | 'id';
  };
  
  interface DefinedEnumValues {
    ErrorCodeEnum: 'BAD_INPUT' | 'ACCESS_DENIED' | 'DB_ERROR' | 'UNKNOWN_ERROR';
  };
  
  export type ErrorCodeEnum = DefinedEnumValues['ErrorCodeEnum'];
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type defaultErrorExtension = Pick<Types.DefaultErrorExtension, DefinedFields['defaultErrorExtension']>;
  export type BadInputErrorExtension = Pick<Types.BadInputErrorExtension, DefinedFields['BadInputErrorExtension']>;
  export type ErrorExtension = Types.ErrorExtension;
  export type Error = Pick<Types.Error, DefinedFields['Error']>;
  export type MutationResponse = Pick<Types.MutationResponse, DefinedFields['MutationResponse']>;
  
  export type Scalars = Pick<Types.Scalars, 'DateTime' | 'Object'>;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  export type ObjectScalarConfig = Types.ObjectScalarConfig;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type defaultErrorExtensionResolvers = Pick<Types.DefaultErrorExtensionResolvers, DefinedFields['defaultErrorExtension'] | '__isTypeOf'>;
  export type BadInputErrorExtensionResolvers = Pick<Types.BadInputErrorExtensionResolvers, DefinedFields['BadInputErrorExtension'] | '__isTypeOf'>;
  export type ErrorResolvers = Pick<Types.ErrorResolvers, DefinedFields['Error'] | '__isTypeOf'>;
  export type MutationResponseResolvers = Pick<Types.MutationResponseResolvers, DefinedFields['MutationResponse'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    defaultErrorExtension?: defaultErrorExtensionResolvers;
    BadInputErrorExtension?: BadInputErrorExtensionResolvers;
    Error?: ErrorResolvers;
    MutationResponse?: MutationResponseResolvers;
    DateTime?: Types.Resolvers['DateTime'];
    Object?: Types.Resolvers['Object'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      ping?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      _empty?: gm.Middleware[];
    };
    defaultErrorExtension?: {
      '*'?: gm.Middleware[];
      _empty?: gm.Middleware[];
    };
    BadInputErrorExtension?: {
      '*'?: gm.Middleware[];
      path?: gm.Middleware[];
    };
    Error?: {
      '*'?: gm.Middleware[];
      code?: gm.Middleware[];
      message?: gm.Middleware[];
      extension?: gm.Middleware[];
    };
    MutationResponse?: {
      '*'?: gm.Middleware[];
      success?: gm.Middleware[];
      errors?: gm.Middleware[];
      id?: gm.Middleware[];
    };
  };
}