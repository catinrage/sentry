import { loadFilesSync } from '@graphql-tools/load-files';
import { createModule } from 'graphql-modules';
import { join } from 'path';

export const projectStageScheduleMetadata = createModule({
  id: 'projectStageScheduleMetadata-module',
  dirname: __dirname,
  typeDefs: loadFilesSync(join(__dirname, './*.graphql')),
  resolvers: loadFilesSync(join(__dirname, './resolvers.ts')),
});
