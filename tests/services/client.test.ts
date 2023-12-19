import { describe, it, expect } from 'vitest';
import { ClientService, ProjectService } from '../../src/aliases/services';

describe('ClientService', () => {
  it('Create / correct input [Success]', async () => {
    const client = await ClientService.create({
      name: 'John Doe',
    });
    expect(client.success).toBe(true);
  });
  it('Create / with duplicate name [Fail]', async () => {
    const client = await ClientService.create({
      name: 'John Doe',
    });
    const clientWithTheSameName = await ClientService.create({
      name: 'John Doe',
    });
    expect(clientWithTheSameName.success).toBe(false);
  });
  it('Update / correct input [Success]', async () => {
    const client = await ClientService.create({
      name: 'John Doe',
    });
    expect(client.id).toBeTypeOf('string');
    if (!client.id) return;
    const updatedClient = await ClientService.update(client.id, {
      name: 'John Doe 2',
    });
    expect(updatedClient.success).toBe(true);
  });
  it('Update / with duplicate name [Fail]', async () => {
    const client = await ClientService.create({
      name: 'John Doe',
    });
    const client2 = await ClientService.create({
      name: 'John Doe 2',
    });
    expect(client.id).toBeTypeOf('string');
    if (!client.id) return;
    const updatedClient = await ClientService.update(client.id, {
      name: 'John Doe 2',
    });
    expect(updatedClient.success).toBe(false);
  });
  it('Delete / correct input [Success]', async () => {
    const client = await ClientService.create({
      name: 'John Doe',
    });
    expect(client.id).toBeTypeOf('string');
    if (!client.id) return;
    const deletedClient = await ClientService.delete(client.id);
    expect(deletedClient.success).toBe(true);
  });
  it('Delete / with invalid id [Fail]', async () => {
    const client = await ClientService.create({
      name: 'John Doe',
    });
    const deletedClient = await ClientService.delete('invalid-id');
    expect(deletedClient.success).toBe(false);
  });
  it('Delete / while has at least a project [Fail]', async () => {
    const client = await ClientService.create({
      name: 'John Doe',
    });
    expect(client.id).toBeTypeOf('string');
    if (!client.id) return;
    const project = await ProjectService.create({
      clientId: client.id,
      code: 'TEST',
      title: 'Test Project',
      quantity: 100,
    });
    const deletedClient = await ClientService.delete(client.id);
    expect(deletedClient.success).toBe(false);
  });
});
