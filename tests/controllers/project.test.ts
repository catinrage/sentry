import { describe, it, expect } from 'vitest';
import controllers from '@controllers';

describe('Project Controller', () => {
  it('Create / correct input [Success]', async () => {
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
  it('Create / with invalid client id [Fail]', async () => {
    const project = await controllers['Project'].create({
      title: 'Test Project',
      clientId: 'invalid-id',
      code: 'TEST',
      quantity: 100,
    });
    expect(project.success).toBe(false);
  });
  it('Create / with duplicate code [Fail]', async () => {
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
    const project2 = await controllers['Project'].create({
      title: 'Test Project',
      clientId: client.id,
      code: 'TEST',
      quantity: 100,
    });
    expect(project2.success).toBe(false);
  });
  it('Update / correct input [Success]', async () => {
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
    if (!project.id) return;
    const updatedProject = await controllers['Project'].update(project.id, {
      title: 'Test Project 2',
      clientId: client.id,
      code: 'TEST2',
      quantity: 100,
    });
    expect(updatedProject.success).toBe(true);
  });
  it('Update / with invalid client id [Fail]', async () => {
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
    if (!project.id) return;
    const updatedProject = await controllers['Project'].update(project.id, {
      title: 'Test Project 2',
      clientId: 'invalid-id',
      code: 'TEST2',
      quantity: 100,
    });
    expect(updatedProject.success).toBe(false);
  });
  it('Update / with duplicate code [Fail]', async () => {
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
    if (!project.id) return;
    const project2 = await controllers['Project'].create({
      title: 'Test Project',
      clientId: client.id,
      code: 'TEST2',
      quantity: 100,
    });
    if (!project2.id) return;
    const updatedProject = await controllers['Project'].update(project.id, {
      title: 'Test Project 2',
      clientId: client.id,
      code: 'TEST2',
      quantity: 100,
    });
    expect(updatedProject.success).toBe(false);
  });
  it('Delete / correct input [Success]', async () => {
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
    if (!project.id) return;
    const deletedProject = await controllers['Project'].delete(project.id);
    expect(deletedProject.success).toBe(true);
  });
  it('Delete / with invalid id [Fail]', async () => {
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
    const deletedProject = await controllers['Project'].delete('invalid-id');
    expect(deletedProject.success).toBe(false);
  });
});
