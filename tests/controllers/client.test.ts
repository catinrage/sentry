import { describe, it, expect } from 'vitest';
import controllers from '@controllers';
import prisma from '@prisma';

describe('Client Controller', () => {
  it('Create / correct input [Success]', async () => {
    const client = await controllers['Client'].create({
      name: 'John Doe',
    });
    expect(client.success).toBe(true);
  });
  it('Create / with duplicate name [Fail]', async () => {
    const client = await controllers['Client'].create({
      name: 'John Doe',
    });
    const clientWithTheSameName = await controllers['Client'].create({
      name: 'John Doe',
    });
    expect(clientWithTheSameName.success).toBe(false);
  });
  it('Update / correct input [Success]', async () => {
    const client = await controllers['Client'].create({
      name: 'John Doe',
    });
    expect(client.id).toBeTypeOf('string');
    if (!client.id) return;
    const updatedClient = await controllers['Client'].update(client.id, {
      name: 'John Doe 2',
    });
    expect(updatedClient.success).toBe(true);
  });
  it('Update / with duplicate name [Fail]', async () => {
    const client = await controllers['Client'].create({
      name: 'John Doe',
    });
    const client2 = await controllers['Client'].create({
      name: 'John Doe 2',
    });
    expect(client.id).toBeTypeOf('string');
    if (!client.id) return;
    const updatedClient = await controllers['Client'].update(client.id, {
      name: 'John Doe 2',
    });
    expect(updatedClient.success).toBe(false);
  });
  it('Delete / correct input [Success]', async () => {
    const client = await controllers['Client'].create({
      name: 'John Doe',
    });
    expect(client.id).toBeTypeOf('string');
    if (!client.id) return;
    const deletedClient = await controllers['Client'].delete(client.id);
    expect(deletedClient.success).toBe(true);
  });
  it('Delete / with invalid id [Fail]', async () => {
    const client = await controllers['Client'].create({
      name: 'John Doe',
    });
    const deletedClient = await controllers['Client'].delete('invalid-id');
    expect(deletedClient.success).toBe(false);
  });
  // TODO: this should move to project test
  it('Delete / while has at least a project [Fail]', async () => {
    const client = await controllers['Client'].create({
      name: 'John Doe',
    });
    expect(client.id).toBeTypeOf('string');
    if (!client.id) return;
    await controllers['Project'].create({
      clientId: client.id,
      code: 'TEST',
      title: 'Test Project',
      quantity: 100,
    });
    await prisma.client
      .findFirst({
        where: {
          id: client.id,
        },
      })
      .projects();
    const deletedClient = await controllers['Client'].delete(client.id);
    expect(deletedClient.success).toBe(false);
  });
});
