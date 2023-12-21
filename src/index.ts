import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { createApplication } from 'graphql-modules';
import modules from './modules';

const application = createApplication({
  modules,
});

const schema = application.createSchemaForApollo();

const server = new ApolloServer({
  schema,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    return {
      req,
    };
  },
});

console.log('hi');

console.log(`🚀 Server ready at ${url}`);
