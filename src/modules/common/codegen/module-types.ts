/* eslint-disable */
import * as Types from "../../../codegen/graphql";
import * as gm from "graphql-modules";
export namespace CommonModule {
  interface DefinedFields {
    Query: 'ping';
    Mutation: '_empty';
    Error: 'code' | 'message' | 'extension';
    MutationResponse: 'success' | 'errors';
  };
  
  interface DefinedEnumValues {
    ErrorCodeEnum: 'BAD_INPUT' | 'ACCESS_DENIED' | 'UNKNOWN_ERROR';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Error = Pick<Types.Error, DefinedFields['Error']>;
  export type ErrorCodeEnum = DefinedEnumValues['ErrorCodeEnum'];
  export type MutationResponse = Pick<Types.MutationResponse, DefinedFields['MutationResponse']>;
  
  export type Scalars = Pick<Types.Scalars, 'DateTime' | 'Date' | 'Object'>;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  export type DateScalarConfig = Types.DateScalarConfig;
  export type ObjectScalarConfig = Types.ObjectScalarConfig;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type ErrorResolvers = Pick<Types.ErrorResolvers, DefinedFields['Error'] | '__isTypeOf'>;
  export type MutationResponseResolvers = Pick<Types.MutationResponseResolvers, DefinedFields['MutationResponse']>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Error?: ErrorResolvers;
    DateTime?: Types.Resolvers['DateTime'];
    Date?: Types.Resolvers['Date'];
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
    Error?: {
      '*'?: gm.Middleware[];
      code?: gm.Middleware[];
      message?: gm.Middleware[];
      extension?: gm.Middleware[];
    };
  };
}