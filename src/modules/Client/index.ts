import { loadFilesSync } from '@graphql-tools/load-files';
import { createModule } from 'graphql-modules';
import { join } from 'path';
import { resolvers } from './resolvers';

const typeDefs = loadFilesSync(join(import.meta.dir, './*.graphql'));

export const clientModule = createModule({
  id: 'client-module',
  typeDefs,
  resolvers,
});
