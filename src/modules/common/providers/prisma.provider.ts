import { PrismaClient } from '@prisma/client';
import { Injectable } from 'graphql-modules';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
}
