import resetDb from './reset-db';
import { beforeEach, afterAll } from 'vitest';

beforeEach(async () => {
  await resetDb();
});

afterAll(async () => {
  await resetDb();
});
