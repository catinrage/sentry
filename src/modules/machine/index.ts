import { loadFilesSync } from '@graphql-tools/load-files';
import { InjectionToken, createModule } from 'graphql-modules';
import { join } from 'path';
import { MachineService } from './providers';
import { PrismaService } from '../common/providers/prisma.provider';

export const clientModule = createModule({
  id: 'machine-module',
  dirname: __dirname,
  typeDefs: loadFilesSync(join(__dirname, './types/*.graphql')),
  resolvers: loadFilesSync(join(__dirname, './resolvers.ts')),
  providers: [PrismaService, MachineService],
});
