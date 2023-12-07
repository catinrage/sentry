import { loadFilesSync } from '@graphql-tools/load-files';
import { createModule } from 'graphql-modules';
import { join } from 'path';

export const clientModule = createModule({
  id: 'client-module',
  dirname: __dirname,
  typeDefs: loadFilesSync(join(__dirname, './*.graphql')),
  resolvers: loadFilesSync(join(__dirname, './resolvers.ts')),
});
