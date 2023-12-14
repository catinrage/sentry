import { _Module } from './codegen/module-types';
import { DateTimeResolver, DateResolver } from 'graphql-scalars';
import { GraphQLJSONObject } from 'graphql-type-json';

export const resolvers: _Module.Resolvers = {
  Error: {
    extension: {
      resolve: async (error, data, _, info) => {
        if (error.extension && error.extension.__typename === 'BadInputErrorExtension') {
          return {
            __typename: 'BadInputErrorExtension',
            path: error.extension.path,
          };
        }
        return {
          __typename: 'defaultErrorExtension',
        };
      },
    },
  },
  Query: {
    ping: () => 'pong',
  },
  DateTime: DateTimeResolver,
  Date: DateResolver,
  Object: GraphQLJSONObject,
};
