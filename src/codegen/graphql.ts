/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export type BadInputErrorExtension = {
  __typename?: 'BadInputErrorExtension';
  path?: Maybe<Array<Scalars['String']['output']>>;
};

/** a client is a person, a company or an organization */
export type Client = {
  __typename?: 'Client';
  createdAt: Scalars['DateTime']['output'];
  /** the unique identifier, also used as the primary key */
  id: Scalars['ID']['output'];
  /** the name of the client */
  name: Scalars['String']['output'];
  /** projects for this client */
  projects?: Maybe<Array<Project>>;
  updatedAt: Scalars['DateTime']['output'];
};

/** input fields to create a new client */
export type ClientInputCreate = {
  /** the name of the client */
  name: Scalars['String']['input'];
};

/** input fields to update an existing client */
export type ClientInputUpdate = {
  /** the name of the client */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** contains information about the error that occurred */
export type Error = {
  __typename?: 'Error';
  /** error code (ErrorCodeEnum) */
  code: ErrorCodeEnum;
  /** contains extra data about the error */
  extension?: Maybe<ErrorExtension>;
  /** error message */
  message: Scalars['String']['output'];
};

/**  enum for possible error codes  */
export type ErrorCodeEnum =
  | 'ACCESS_DENIED'
  | 'BAD_INPUT'
  | 'DB_ERROR'
  | 'UNKNOWN_ERROR';

export type ErrorExtension = BadInputErrorExtension | DefaultErrorExtension;

/** a cnc machine */
export type Machine = {
  __typename?: 'Machine';
  /** indicates if the machine is currently available */
  available: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  /** the unique identifier, also used as the primary key */
  id: Scalars['ID']['output'];
  /** the name of the machine */
  name: Scalars['String']['output'];
  /** schedules for this machine */
  schedules?: Maybe<Array<ProjectStageSchedule>>;
  /** type of the machine */
  type: MachineTypeEnum;
  updatedAt: Scalars['DateTime']['output'];
};

/** input fields to create a new machine */
export type MachineInputCreate = {
  /** indicates if the machine is currently available */
  available?: InputMaybe<Scalars['Boolean']['input']>;
  /** the name of the machine */
  name: Scalars['String']['input'];
  /** type of the machine */
  type: MachineTypeEnum;
};

/** input fields to update an existing machine */
export type MachineInputUpdate = {
  /** indicates if the machine is currently available */
  available?: InputMaybe<Scalars['Boolean']['input']>;
  /** the name of the machine */
  name?: InputMaybe<Scalars['String']['input']>;
  /** type of the machine */
  type?: InputMaybe<MachineTypeEnum>;
};

/**  enum for machine type  */
export type MachineTypeEnum =
  | 'CNC_MILLING'
  | 'CNC_TURNING'
  | 'CNC_WIRECUT';

/** graphql Mutation root */
export type Mutation = {
  __typename?: 'Mutation';
  /** placeholder */
  _empty?: Maybe<Scalars['String']['output']>;
  /** creates a new client */
  clientCreate: MutationResponse;
  /** deletes an client */
  clientDelete: MutationResponse;
  /** updates an existing client */
  clientUpdate: MutationResponse;
  /** creates a new machine */
  machineCreate: MutationResponse;
  /** deletes an machine */
  machineDelete: MutationResponse;
  /** updates an existing machine */
  machineUpdate: MutationResponse;
  /** creates a new project */
  projectCreate: MutationResponse;
  /** deletes an project */
  projectDelete: MutationResponse;
  /** reorder stages in a project */
  projectReorderStages: MutationResponse;
  /** create a project stage */
  projectStageCreate: MutationResponse;
  /** delete a project stage */
  projectStageDelete: MutationResponse;
  /** create a project stage schedule */
  projectStageScheduleCreate: MutationResponse;
  /** delete a project stage schedule */
  projectStageScheduleDelete: MutationResponse;
  /** create a project stage schedule interruption */
  projectStageScheduleInterruptionCreate: MutationResponse;
  /** delete a project stage schedule interruption */
  projectStageScheduleInterruptionDelete: MutationResponse;
  /** update a project stage schedule interruption */
  projectStageScheduleInterruptionUpdate: MutationResponse;
  /** update a project stage schedule */
  projectStageScheduleUpdate: MutationResponse;
  /** update a project stage */
  projectStageUpdate: MutationResponse;
  /** updates an existing project */
  projectUpdate: MutationResponse;
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


/** graphql Mutation root */
export type MutationProjectCreateArgs = {
  input: ProjectInputCreate;
};


/** graphql Mutation root */
export type MutationProjectDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** graphql Mutation root */
export type MutationProjectReorderStagesArgs = {
  projectId: Scalars['ID']['input'];
};


/** graphql Mutation root */
export type MutationProjectStageCreateArgs = {
  input: ProjectStageInputCreate;
};


/** graphql Mutation root */
export type MutationProjectStageDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** graphql Mutation root */
export type MutationProjectStageScheduleCreateArgs = {
  input: ProjectStageScheduleInputCreate;
};


/** graphql Mutation root */
export type MutationProjectStageScheduleDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** graphql Mutation root */
export type MutationProjectStageScheduleInterruptionCreateArgs = {
  input: ProjectStageScheduleInterruptionInputCreate;
};


/** graphql Mutation root */
export type MutationProjectStageScheduleInterruptionDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** graphql Mutation root */
export type MutationProjectStageScheduleInterruptionUpdateArgs = {
  id: Scalars['ID']['input'];
  input: ProjectStageScheduleInterruptionInputUpdate;
};


/** graphql Mutation root */
export type MutationProjectStageScheduleUpdateArgs = {
  id: Scalars['ID']['input'];
  input: ProjectStageScheduleInputUpdate;
};


/** graphql Mutation root */
export type MutationProjectStageUpdateArgs = {
  id: Scalars['ID']['input'];
  input: ProjectStageInputUpdate;
};


/** graphql Mutation root */
export type MutationProjectUpdateArgs = {
  id: Scalars['ID']['input'];
  input: ProjectInputUpdate;
};

/**  type for mutation responses  */
export type MutationResponse = {
  __typename?: 'MutationResponse';
  /** contains information about errors that occurred */
  errors: Array<Error>;
  /** if mutation was successful this will hold the id for the mutated record */
  id?: Maybe<Scalars['String']['output']>;
  /** indicates whether the mutation was successful */
  success: Scalars['Boolean']['output'];
};

/** project type */
export type Project = {
  __typename?: 'Project';
  /** project's client */
  client: Client;
  /** code associated with the project */
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  /** description for this project */
  description?: Maybe<Scalars['String']['output']>;
  /** project's due date */
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  /** fee for each part */
  fee?: Maybe<Scalars['Int']['output']>;
  /** the unique identifier, also used as the primary key */
  id: Scalars['ID']['output'];
  /** quantity of the parts that must be processed */
  quantity: Scalars['Int']['output'];
  /** stages for this project */
  stages?: Maybe<Array<ProjectStage>>;
  /** project's title */
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** input fields to create a new project */
export type ProjectInputCreate = {
  /** project's client's id */
  clientId: Scalars['String']['input'];
  /** code associated with the project */
  code: Scalars['String']['input'];
  /** description for this project */
  description?: InputMaybe<Scalars['String']['input']>;
  /** project's due date */
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** fee for each part */
  fee?: InputMaybe<Scalars['Int']['input']>;
  /** quantity of the parts that must be processed */
  quantity: Scalars['Int']['input'];
  /** project's title */
  title: Scalars['String']['input'];
};

/** input fields to update an existing project */
export type ProjectInputUpdate = {
  /** project's client's id */
  clientId?: InputMaybe<Scalars['String']['input']>;
  /** code associated with the project */
  code?: InputMaybe<Scalars['String']['input']>;
  /** description for this project */
  description?: InputMaybe<Scalars['String']['input']>;
  /** project's due date */
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** fee for each part */
  fee?: InputMaybe<Scalars['Int']['input']>;
  /** quantity of the parts that must be processed */
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** project's title */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** a stage for project */
export type ProjectStage = {
  __typename?: 'ProjectStage';
  createdAt: Scalars['DateTime']['output'];
  /** default schedule metadata for this stage, each schedule for this stage should be based on this initially */
  defaultMetadata?: Maybe<ProjectStageScheduleMetadata>;
  /** the unique identifier */
  id: Scalars['ID']['output'];
  /** determines the number of the stage */
  number: Scalars['Int']['output'];
  /** project that this stage belongs to */
  project: Project;
  /** schedules for this stage */
  schedules?: Maybe<Array<ProjectStageSchedule>>;
  /** title for this stage */
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

/**  input fields to create a new project stage  */
export type ProjectStageInputCreate = {
  /** default schedule metadata for this stage, each schedule for this stage should be based on this initially */
  defaultMetadata: ProjectStageScheduleMetadataInputCreate;
  /** project's id that this stage belongs to */
  projectId: Scalars['String']['input'];
  /** title for this stage */
  title?: InputMaybe<Scalars['String']['input']>;
};

/**  input fields to update an existing project stage  */
export type ProjectStageInputUpdate = {
  /** default schedule metadata for this stage, each schedule for this stage should be based on this initially */
  defaultMetadata?: InputMaybe<ProjectStageScheduleMetadataInputUpdate>;
  /** title for this stage */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** a schedule for a project stage */
export type ProjectStageSchedule = {
  __typename?: 'ProjectStageSchedule';
  createdAt: Scalars['DateTime']['output'];
  /** end date of the schedule (its either the estimated or the actual) */
  dateEnd?: Maybe<Scalars['DateTime']['output']>;
  /** actual date when the schedule has ended */
  dateEndActual?: Maybe<Scalars['DateTime']['output']>;
  /** estimated date when the schedule ends */
  dateEndEstimated?: Maybe<Scalars['DateTime']['output']>;
  /** start date of the schedule */
  dateStart?: Maybe<Scalars['DateTime']['output']>;
  /** fixed date when the schedule starts */
  dateStartFixed?: Maybe<Scalars['DateTime']['output']>;
  /** the unique identifier */
  id: Scalars['ID']['output'];
  /** list of interruptions in the schedule */
  interruptions: Array<ProjectStageScheduleInterruption>;
  /** the machine that is being used for this stage schedule */
  machine: Machine;
  /** metadata for this specific schedule */
  metadata?: Maybe<ProjectStageScheduleMetadata>;
  /** next schedule */
  next?: Maybe<ProjectStageSchedule>;
  /** previous schedule */
  previous?: Maybe<ProjectStageSchedule>;
  /** the quantity that will be processed in this schedule */
  quantity: Scalars['Int']['output'];
  /** the stage for this schedule */
  stage: ProjectStage;
  /** the state of the schedule */
  state: ProjectStageScheduleStateEnum;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProjectStageScheduleInputCreate = {
  /** fixed date when the schedule starts */
  dateStartFixed?: InputMaybe<Scalars['DateTime']['input']>;
  /** the machine that is being used for this stage schedule */
  machineId: Scalars['ID']['input'];
  /** metadata for this specific schedule */
  metadata: ProjectStageScheduleMetadataInputCreate;
  /** id for the previous schedule */
  previousId?: InputMaybe<Scalars['ID']['input']>;
  /** the quantity that will be processed in this schedule */
  quantity: Scalars['Int']['input'];
  /** the stage for this schedule */
  stageId: Scalars['ID']['input'];
  /** the state of the schedule */
  state?: InputMaybe<ProjectStageScheduleStateEnum>;
};

export type ProjectStageScheduleInputUpdate = {
  /** fixed date when the schedule starts */
  dateStartFixed?: InputMaybe<Scalars['DateTime']['input']>;
  /** the machine that is being used for this stage schedule */
  machineId?: InputMaybe<Scalars['ID']['input']>;
  /** metadata for this specific schedule */
  metadata?: InputMaybe<ProjectStageScheduleMetadataInputUpdate>;
  /** id for the previous schedule */
  previousId?: InputMaybe<Scalars['ID']['input']>;
  /** the quantity that will be processed in this schedule */
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** the state of the schedule */
  state?: InputMaybe<ProjectStageScheduleStateEnum>;
};

/** a interruption in the schedule of a stage */
export type ProjectStageScheduleInterruption = {
  __typename?: 'ProjectStageScheduleInterruption';
  /** date when the schedule ends */
  dateEnd: Scalars['DateTime']['output'];
  /** date when the schedule starts */
  dateStart: Scalars['DateTime']['output'];
  /** the unique identifier */
  id: Scalars['ID']['output'];
  /** reason for the interruption */
  reason: Scalars['String']['output'];
};

export type ProjectStageScheduleInterruptionInputCreate = {
  /** date when the schedule ends */
  dateEnd: Scalars['DateTime']['input'];
  /** date when the schedule starts */
  dateStart: Scalars['DateTime']['input'];
  /** schedule that this interruption belongs to */
  projectStageScheduleId: Scalars['ID']['input'];
  /** reason for the interruption */
  reason: Scalars['String']['input'];
};

export type ProjectStageScheduleInterruptionInputUpdate = {
  /** date when the schedule ends */
  dateEnd?: InputMaybe<Scalars['DateTime']['input']>;
  /** date when the schedule starts */
  dateStart?: InputMaybe<Scalars['DateTime']['input']>;
  /** reason for the interruption */
  reason?: InputMaybe<Scalars['String']['input']>;
};

/** contains some metadata about the schedule of a project stage */
export type ProjectStageScheduleMetadata = {
  __typename?: 'ProjectStageScheduleMetadata';
  /** execution duration in minutes */
  durationExecution: Scalars['Int']['output'];
  /** preparation duration before each execution in minutes */
  durationPreparation: Scalars['Int']['output'];
  /** initial setup duration in minutes */
  durationSetup: Scalars['Int']['output'];
  /** estimated efficiency of the schedule (between 0 and 1) */
  efficiencyEstimated: Scalars['Float']['output'];
  /** a unique identifier */
  id: Scalars['ID']['output'];
  /** how many output parts are produced per execution */
  numberOfOutputParts: Scalars['Int']['output'];
  /** how many setups are required to produce all output parts */
  numberOfSetups: Scalars['Int']['output'];
};

export type ProjectStageScheduleMetadataInputCreate = {
  /** execution duration in minutes */
  durationExecution: Scalars['Int']['input'];
  /** preparation duration before each execution in minutes */
  durationPreparation: Scalars['Int']['input'];
  /** initial setup duration in minutes */
  durationSetup: Scalars['Int']['input'];
  /** estimated efficiency of the schedule (between 0 and 1) */
  efficiencyEstimated: Scalars['Float']['input'];
  /** how many output parts are produced per execution */
  numberOfOutputParts: Scalars['Int']['input'];
  /** how many setups are required to produce all output parts */
  numberOfSetups: Scalars['Int']['input'];
};

export type ProjectStageScheduleMetadataInputUpdate = {
  /** execution duration in minutes */
  durationExecution?: InputMaybe<Scalars['Int']['input']>;
  /** preparation duration before each execution in minutes */
  durationPreparation?: InputMaybe<Scalars['Int']['input']>;
  /** initial setup duration in minutes */
  durationSetup?: InputMaybe<Scalars['Int']['input']>;
  /** estimated efficiency of the schedule (between 0 and 1) */
  efficiencyEstimated?: InputMaybe<Scalars['Float']['input']>;
  /** how many output parts are produced per execution */
  numberOfOutputParts?: InputMaybe<Scalars['Int']['input']>;
  /** how many setups are required to produce all output parts */
  numberOfSetups?: InputMaybe<Scalars['Int']['input']>;
};

/** enum for project state schedule state */
export type ProjectStageScheduleStateEnum =
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'PAUSED'
  | 'PENDING';

/** graphql Query root */
export type Query = {
  __typename?: 'Query';
  /** returns a client given its unique identifier */
  client?: Maybe<Client>;
  /** returns a list of clients */
  clients: Array<Client>;
  /** returns a machine given its unique identifier */
  machine?: Maybe<Machine>;
  /** returns a list of machines */
  machines: Array<Machine>;
  /** lets play ping pong */
  ping: Scalars['String']['output'];
  /** returns a project given its unique identifier */
  project?: Maybe<Project>;
  /** returns a list of projects */
  projects: Array<Project>;
};


/** graphql Query root */
export type QueryClientArgs = {
  id: Scalars['ID']['input'];
};


/** graphql Query root */
export type QueryMachineArgs = {
  id: Scalars['ID']['input'];
};


/** graphql Query root */
export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};

export type DefaultErrorExtension = {
  __typename?: 'defaultErrorExtension';
  _empty?: Maybe<Scalars['String']['output']>;
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

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  ErrorExtension: ( BadInputErrorExtension ) | ( DefaultErrorExtension );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BadInputErrorExtension: ResolverTypeWrapper<BadInputErrorExtension>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Client: ResolverTypeWrapper<Client>;
  ClientInputCreate: ClientInputCreate;
  ClientInputUpdate: ClientInputUpdate;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Error: ResolverTypeWrapper<Omit<Error, 'extension'> & { extension?: Maybe<ResolversTypes['ErrorExtension']> }>;
  ErrorCodeEnum: ErrorCodeEnum;
  ErrorExtension: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ErrorExtension']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Machine: ResolverTypeWrapper<Machine>;
  MachineInputCreate: MachineInputCreate;
  MachineInputUpdate: MachineInputUpdate;
  MachineTypeEnum: MachineTypeEnum;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<MutationResponse>;
  Object: ResolverTypeWrapper<Scalars['Object']['output']>;
  Project: ResolverTypeWrapper<Project>;
  ProjectInputCreate: ProjectInputCreate;
  ProjectInputUpdate: ProjectInputUpdate;
  ProjectStage: ResolverTypeWrapper<ProjectStage>;
  ProjectStageInputCreate: ProjectStageInputCreate;
  ProjectStageInputUpdate: ProjectStageInputUpdate;
  ProjectStageSchedule: ResolverTypeWrapper<ProjectStageSchedule>;
  ProjectStageScheduleInputCreate: ProjectStageScheduleInputCreate;
  ProjectStageScheduleInputUpdate: ProjectStageScheduleInputUpdate;
  ProjectStageScheduleInterruption: ResolverTypeWrapper<ProjectStageScheduleInterruption>;
  ProjectStageScheduleInterruptionInputCreate: ProjectStageScheduleInterruptionInputCreate;
  ProjectStageScheduleInterruptionInputUpdate: ProjectStageScheduleInterruptionInputUpdate;
  ProjectStageScheduleMetadata: ResolverTypeWrapper<ProjectStageScheduleMetadata>;
  ProjectStageScheduleMetadataInputCreate: ProjectStageScheduleMetadataInputCreate;
  ProjectStageScheduleMetadataInputUpdate: ProjectStageScheduleMetadataInputUpdate;
  ProjectStageScheduleStateEnum: ProjectStageScheduleStateEnum;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  defaultErrorExtension: ResolverTypeWrapper<DefaultErrorExtension>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BadInputErrorExtension: BadInputErrorExtension;
  Boolean: Scalars['Boolean']['output'];
  Client: Client;
  ClientInputCreate: ClientInputCreate;
  ClientInputUpdate: ClientInputUpdate;
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  Error: Omit<Error, 'extension'> & { extension?: Maybe<ResolversParentTypes['ErrorExtension']> };
  ErrorExtension: ResolversUnionTypes<ResolversParentTypes>['ErrorExtension'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Machine: Machine;
  MachineInputCreate: MachineInputCreate;
  MachineInputUpdate: MachineInputUpdate;
  Mutation: {};
  MutationResponse: MutationResponse;
  Object: Scalars['Object']['output'];
  Project: Project;
  ProjectInputCreate: ProjectInputCreate;
  ProjectInputUpdate: ProjectInputUpdate;
  ProjectStage: ProjectStage;
  ProjectStageInputCreate: ProjectStageInputCreate;
  ProjectStageInputUpdate: ProjectStageInputUpdate;
  ProjectStageSchedule: ProjectStageSchedule;
  ProjectStageScheduleInputCreate: ProjectStageScheduleInputCreate;
  ProjectStageScheduleInputUpdate: ProjectStageScheduleInputUpdate;
  ProjectStageScheduleInterruption: ProjectStageScheduleInterruption;
  ProjectStageScheduleInterruptionInputCreate: ProjectStageScheduleInterruptionInputCreate;
  ProjectStageScheduleInterruptionInputUpdate: ProjectStageScheduleInterruptionInputUpdate;
  ProjectStageScheduleMetadata: ProjectStageScheduleMetadata;
  ProjectStageScheduleMetadataInputCreate: ProjectStageScheduleMetadataInputCreate;
  ProjectStageScheduleMetadataInputUpdate: ProjectStageScheduleMetadataInputUpdate;
  Query: {};
  String: Scalars['String']['output'];
  defaultErrorExtension: DefaultErrorExtension;
};

export type BadInputErrorExtensionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BadInputErrorExtension'] = ResolversParentTypes['BadInputErrorExtension']> = {
  path?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClientResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Client'] = ResolversParentTypes['Client']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<ResolversTypes['Project']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
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
  extension?: Resolver<Maybe<ResolversTypes['ErrorExtension']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorExtensionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ErrorExtension'] = ResolversParentTypes['ErrorExtension']> = {
  __resolveType: TypeResolveFn<'BadInputErrorExtension' | 'defaultErrorExtension', ParentType, ContextType>;
};

export type MachineResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Machine'] = ResolversParentTypes['Machine']> = {
  available?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  schedules?: Resolver<Maybe<Array<ResolversTypes['ProjectStageSchedule']>>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MachineTypeEnum'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clientCreate?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationClientCreateArgs, 'input'>>;
  clientDelete?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationClientDeleteArgs, 'id'>>;
  clientUpdate?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationClientUpdateArgs, 'id' | 'input'>>;
  machineCreate?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationMachineCreateArgs, 'input'>>;
  machineDelete?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationMachineDeleteArgs, 'id'>>;
  machineUpdate?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationMachineUpdateArgs, 'id' | 'input'>>;
  projectCreate?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationProjectCreateArgs, 'input'>>;
  projectDelete?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationProjectDeleteArgs, 'id'>>;
  projectReorderStages?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationProjectReorderStagesArgs, 'projectId'>>;
  projectStageCreate?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationProjectStageCreateArgs, 'input'>>;
  projectStageDelete?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationProjectStageDeleteArgs, 'id'>>;
  projectStageScheduleCreate?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationProjectStageScheduleCreateArgs, 'input'>>;
  projectStageScheduleDelete?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationProjectStageScheduleDeleteArgs, 'id'>>;
  projectStageScheduleInterruptionCreate?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationProjectStageScheduleInterruptionCreateArgs, 'input'>>;
  projectStageScheduleInterruptionDelete?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationProjectStageScheduleInterruptionDeleteArgs, 'id'>>;
  projectStageScheduleInterruptionUpdate?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationProjectStageScheduleInterruptionUpdateArgs, 'id' | 'input'>>;
  projectStageScheduleUpdate?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationProjectStageScheduleUpdateArgs, 'id' | 'input'>>;
  projectStageUpdate?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationProjectStageUpdateArgs, 'id' | 'input'>>;
  projectUpdate?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationProjectUpdateArgs, 'id' | 'input'>>;
};

export type MutationResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  errors?: Resolver<Array<ResolversTypes['Error']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Object'], any> {
  name: 'Object';
}

export type ProjectResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  client?: Resolver<ResolversTypes['Client'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  fee?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stages?: Resolver<Maybe<Array<ResolversTypes['ProjectStage']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectStageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProjectStage'] = ResolversParentTypes['ProjectStage']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  defaultMetadata?: Resolver<Maybe<ResolversTypes['ProjectStageScheduleMetadata']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  schedules?: Resolver<Maybe<Array<ResolversTypes['ProjectStageSchedule']>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectStageScheduleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProjectStageSchedule'] = ResolversParentTypes['ProjectStageSchedule']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dateEnd?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  dateEndActual?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  dateEndEstimated?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  dateStart?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  dateStartFixed?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  interruptions?: Resolver<Array<ResolversTypes['ProjectStageScheduleInterruption']>, ParentType, ContextType>;
  machine?: Resolver<ResolversTypes['Machine'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['ProjectStageScheduleMetadata']>, ParentType, ContextType>;
  next?: Resolver<Maybe<ResolversTypes['ProjectStageSchedule']>, ParentType, ContextType>;
  previous?: Resolver<Maybe<ResolversTypes['ProjectStageSchedule']>, ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stage?: Resolver<ResolversTypes['ProjectStage'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['ProjectStageScheduleStateEnum'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectStageScheduleInterruptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProjectStageScheduleInterruption'] = ResolversParentTypes['ProjectStageScheduleInterruption']> = {
  dateEnd?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dateStart?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectStageScheduleMetadataResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProjectStageScheduleMetadata'] = ResolversParentTypes['ProjectStageScheduleMetadata']> = {
  durationExecution?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  durationPreparation?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  durationSetup?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  efficiencyEstimated?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  numberOfOutputParts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberOfSetups?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  client?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType, RequireFields<QueryClientArgs, 'id'>>;
  clients?: Resolver<Array<ResolversTypes['Client']>, ParentType, ContextType>;
  machine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType, RequireFields<QueryMachineArgs, 'id'>>;
  machines?: Resolver<Array<ResolversTypes['Machine']>, ParentType, ContextType>;
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectArgs, 'id'>>;
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
};

export type DefaultErrorExtensionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['defaultErrorExtension'] = ResolversParentTypes['defaultErrorExtension']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  BadInputErrorExtension?: BadInputErrorExtensionResolvers<ContextType>;
  Client?: ClientResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Error?: ErrorResolvers<ContextType>;
  ErrorExtension?: ErrorExtensionResolvers<ContextType>;
  Machine?: MachineResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Object?: GraphQLScalarType;
  Project?: ProjectResolvers<ContextType>;
  ProjectStage?: ProjectStageResolvers<ContextType>;
  ProjectStageSchedule?: ProjectStageScheduleResolvers<ContextType>;
  ProjectStageScheduleInterruption?: ProjectStageScheduleInterruptionResolvers<ContextType>;
  ProjectStageScheduleMetadata?: ProjectStageScheduleMetadataResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  defaultErrorExtension?: DefaultErrorExtensionResolvers<ContextType>;
};


export type Date = Scalars["Date"];
export type DateTime = Scalars["DateTime"];
export type Object = Scalars["Object"];