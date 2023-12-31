import { loadFilesSync } from '@graphql-tools/load-files';
import { createModule } from 'graphql-modules';
import { join } from 'path';

export const commonModule = createModule({
  id: 'base',
  dirname: import.meta.dir,
  typeDefs: loadFilesSync(join(import.meta.dir, './*.graphql')),
  resolvers: loadFilesSync(join(import.meta.dir, './resolvers.ts')),
});
