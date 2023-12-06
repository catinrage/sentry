import { loadFilesSync } from '@graphql-tools/load-files';
import { createModule } from 'graphql-modules';
import { join } from 'path';
import { PrismaService } from './providers/prisma.provider';

export const commonModule = createModule({
  id: 'common-module',
  dirname: __dirname,
  typeDefs: loadFilesSync(join(__dirname, './types/*.graphql')),
  resolvers: loadFilesSync(join(__dirname, './resolvers.ts')),
  providers: [],
});
