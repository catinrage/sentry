/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Object: { input: any; output: any; }
};

/**  a client is a person, a company or an organization */
export type Client = {
  __typename?: 'Client';
  /**  the unique identifier, also used as the primary key  */
  id: Scalars['ID']['output'];
  /**  the name of the client  */
  name: Scalars['String']['output'];
};

/**  input fields to create a new client  */
export type ClientInputCreate = {
  /**  the name of the client  */
  name: Scalars['String']['input'];
};

/**  input fields to update an existing client  */
export type ClientInputUpdate = {
  /**  the name of the client  */
  name?: InputMaybe<Scalars['String']['input']>;
};

/**  the response from the client mutation  */
export type ClientMutationResponse = MutationResponse & {
  __typename?: 'ClientMutationResponse';
  /**  the client that was mutated  */
  client?: Maybe<Client>;
  errors: Array<Error>;
  success: Scalars['Boolean']['output'];
};

/** contains information about the error that occurred */
export type Error = {
  __typename?: 'Error';
  /** error code (ErrorCodeEnum) */
  code: ErrorCodeEnum;
  /** contains extra data about the error */
  extension?: Maybe<Scalars['Object']['output']>;
  /** error message */
  message: Scalars['String']['output'];
};

/**  enum for possible error codes  */
export type ErrorCodeEnum =
  | 'ACCESS_DENIED'
  | 'BAD_INPUT'
  | 'UNKNOWN_ERROR';

/**  a cnc machine  */
export type Machine = {
  __typename?: 'Machine';
  /**  the unique identifier, also used as the primary key  */
  id: Scalars['ID']['output'];
  /**  the name of the machine  */
  name: Scalars['String']['output'];
};

/**  input fields to create a new machine  */
export type MachineInputCreate = {
  /**  the name of the machine  */
  name: Scalars['String']['input'];
};

/**  input fields to update an existing machine  */
export type MachineInputUpdate = {
  /**  the name of the machine  */
  name?: InputMaybe<Scalars['String']['input']>;
};

/**  the response from the machine mutation  */
export type MachineMutationResponse = MutationResponse & {
  __typename?: 'MachineMutationResponse';
  errors: Array<Error>;
  /**  the machine that was mutated  */
  machine?: Maybe<Machine>;
  success: Scalars['Boolean']['output'];
};

/** graphql Mutation root */
export type Mutation = {
  __typename?: 'Mutation';
  /**  placeholder  */
  _empty?: Maybe<Scalars['String']['output']>;
  /**  creates a new client  */
  clientCreate: ClientMutationResponse;
  /**  deletes an client  */
  clientDelete: ClientMutationResponse;
  /**  updates an existing client  */
  clientUpdate: ClientMutationResponse;
  /**  creates a new machine  */
  machineCreate: MachineMutationResponse;
  /**  deletes an machine  */
  machineDelete: MachineMutationResponse;
  /**  updates an existing machine  */
  machineUpdate: MachineMutationResponse;
};


/** graphql Mutation root */
export type MutationClientCreateArgs = {
  input: ClientInputCreate;
};


/** graphql Mutation root */
export type MutationClientDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** graphql Mutation root */
export type MutationClientUpdateArgs = {
  id: Scalars['ID']['input'];
  input: ClientInputUpdate;
};


/** graphql Mutation root */
export type MutationMachineCreateArgs = {
  input: MachineInputCreate;
};


/** graphql Mutation root */
export type MutationMachineDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** graphql Mutation root */
export type MutationMachineUpdateArgs = {
  id: Scalars['ID']['input'];
  input: MachineInputUpdate;
};

/**  interface for mutation responses  */
export type MutationResponse = {
  /** contains information about errors that occurred */
  errors: Array<Error>;
  /** indicates whether the mutation was successful */
  success: Scalars['Boolean']['output'];
};

/** graphql Query root */
export type Query = {
  __typename?: 'Query';
  /**  returns a client given its unique identifier  */
  client?: Maybe<Client>;
  /**  returns a list of clients  */
  clients: Array<Client>;
  /**  returns a machine given its unique identifier  */
  machine?: Maybe<Machine>;
  /**  returns a list of machines  */
  machines: Array<Machine>;
  /**  lets play ping pong  */
  ping: Scalars['String']['output'];
};


/** graphql Query root */
export type QueryClientArgs = {
  id: Scalars['ID']['input'];
};


/** graphql Query root */
export type QueryMachineArgs = {
  id: Scalars['ID']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  MutationResponse: ( ClientMutationResponse ) | ( MachineMutationResponse );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Client: ResolverTypeWrapper<Client>;
  ClientInputCreate: ClientInputCreate;
  ClientInputUpdate: ClientInputUpdate;
  ClientMutationResponse: ResolverTypeWrapper<ClientMutationResponse>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Error: ResolverTypeWrapper<Error>;
  ErrorCodeEnum: ErrorCodeEnum;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Machine: ResolverTypeWrapper<Machine>;
  MachineInputCreate: MachineInputCreate;
  MachineInputUpdate: MachineInputUpdate;
  MachineMutationResponse: ResolverTypeWrapper<MachineMutationResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MutationResponse']>;
  Object: ResolverTypeWrapper<Scalars['Object']['output']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Client: Client;
  ClientInputCreate: ClientInputCreate;
  ClientInputUpdate: ClientInputUpdate;
  ClientMutationResponse: ClientMutationResponse;
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  Error: Error;
  ID: Scalars['ID']['output'];
  Machine: Machine;
  MachineInputCreate: MachineInputCreate;
  MachineInputUpdate: MachineInputUpdate;
  MachineMutationResponse: MachineMutationResponse;
  Mutation: {};
  MutationResponse: ResolversInterfaceTypes<ResolversParentTypes>['MutationResponse'];
  Object: Scalars['Object']['output'];
  Query: {};
  String: Scalars['String']['output'];
};

export type ClientResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Client'] = ResolversParentTypes['Client']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClientMutationResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ClientMutationResponse'] = ResolversParentTypes['ClientMutationResponse']> = {
  client?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType>;
  errors?: Resolver<Array<ResolversTypes['Error']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type ErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  code?: Resolver<ResolversTypes['ErrorCodeEnum'], ParentType, ContextType>;
  extension?: Resolver<Maybe<ResolversTypes['Object']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Machine'] = ResolversParentTypes['Machine']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineMutationResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MachineMutationResponse'] = ResolversParentTypes['MachineMutationResponse']> = {
  errors?: Resolver<Array<ResolversTypes['Error']>, ParentType, ContextType>;
  machine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clientCreate?: Resolver<ResolversTypes['ClientMutationResponse'], ParentType, ContextType, RequireFields<MutationClientCreateArgs, 'input'>>;
  clientDelete?: Resolver<ResolversTypes['ClientMutationResponse'], ParentType, ContextType, RequireFields<MutationClientDeleteArgs, 'id'>>;
  clientUpdate?: Resolver<ResolversTypes['ClientMutationResponse'], ParentType, ContextType, RequireFields<MutationClientUpdateArgs, 'id' | 'input'>>;
  machineCreate?: Resolver<ResolversTypes['MachineMutationResponse'], ParentType, ContextType, RequireFields<MutationMachineCreateArgs, 'input'>>;
  machineDelete?: Resolver<ResolversTypes['MachineMutationResponse'], ParentType, ContextType, RequireFields<MutationMachineDeleteArgs, 'id'>>;
  machineUpdate?: Resolver<ResolversTypes['MachineMutationResponse'], ParentType, ContextType, RequireFields<MutationMachineUpdateArgs, 'id' | 'input'>>;
};

export type MutationResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'ClientMutationResponse' | 'MachineMutationResponse', ParentType, ContextType>;
  errors?: Resolver<Array<ResolversTypes['Error']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export interface ObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Object'], any> {
  name: 'Object';
}

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  client?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType, RequireFields<QueryClientArgs, 'id'>>;
  clients?: Resolver<Array<ResolversTypes['Client']>, ParentType, ContextType>;
  machine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType, RequireFields<QueryMachineArgs, 'id'>>;
  machines?: Resolver<Array<ResolversTypes['Machine']>, ParentType, ContextType>;
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Client?: ClientResolvers<ContextType>;
  ClientMutationResponse?: ClientMutationResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Error?: ErrorResolvers<ContextType>;
  Machine?: MachineResolvers<ContextType>;
  MachineMutationResponse?: MachineMutationResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Object?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
};


export type Date = Scalars["Date"];
export type DateTime = Scalars["DateTime"];
export type Object = Scalars["Object"];