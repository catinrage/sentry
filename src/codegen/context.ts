import type { PrismaClient } from '@prisma/client';
import { Injector } from 'graphql-modules';

export interface Context {
  prisma: PrismaClient;
  req: Request;
  injector: Injector;
}
