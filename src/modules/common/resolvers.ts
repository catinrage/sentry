import { CommonModule } from './codegen/module-types';
import { DateTimeResolver, DateResolver } from 'graphql-scalars';
import { GraphQLJSONObject } from 'graphql-type-json';

export const resolvers: CommonModule.Resolvers = {
  Query: {
    ping: () => 'pong',
  },
  DateTime: DateTimeResolver,
  Date: DateResolver,
  Object: GraphQLJSONObject,
};
