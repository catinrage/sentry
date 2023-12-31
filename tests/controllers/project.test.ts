import { describe, it, expect } from 'vitest';
import controllers from '@controllers';

describe('ProjectService', () => {
  it('should create a project', async () => {
    const client = await controllers['Client'].create({
      name: 'Test Client',
    });
    if (!client.id) return;
    const project = await controllers['Project'].create({
      title: 'Test Project',
      clientId: client.id,
      code: 'TEST',
      quantity: 100,
    });
  });
});
