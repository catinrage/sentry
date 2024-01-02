import { describe, it, expect } from 'vitest';
import controllers from '@controllers';

describe('ProjectStage Controller', () => {
  it('Create / correct input [Success]', async () => {
    const client = await controllers['Client'].create({
      name: 'John Doe',
    });
    expect(client.id).toBeTypeOf('string');
    if (!client.id) return;
    const project = await controllers['Project'].create({
      clientId: client.id,
      code: 'TEST',
      title: 'Test Project',
      quantity: 100,
    });
    expect(project.id).toBeTypeOf('string');
    if (!project.id) return;
    const stage = await controllers['ProjectStage'].create({
      projectId: project.id,
      title: 'Test Stage',
      defaultMetadata: {
        durationExecution: 1,
        durationPreparation: 1,
        durationSetup: 1,
        efficiencyEstimated: 1,
        numberOfOutputParts: 1,
        numberOfSetups: 1,
      },
    });
    expect(stage.success).toBe(true);
  });
  it('Create / with invalid project id [Fail]', async () => {
    const stage = await controllers['ProjectStage'].create({
      projectId: 'invalid-id',
      title: 'Test Stage',
      defaultMetadata: {
        durationExecution: 1,
        durationPreparation: 1,
        durationSetup: 1,
        efficiencyEstimated: 1,
        numberOfOutputParts: 1,
        numberOfSetups: 1,
      },
    });
  });
  it('Update / correct input [Success]', async () => {
    const client = await controllers['Client'].create({
      name: 'John Doe',
    });
    expect(client.id).toBeTypeOf('string');
    if (!client.id) return;
    const project = await controllers['Project'].create({
      clientId: client.id,
      code: 'TEST',
      title: 'Test Project',
      quantity: 100,
    });
    expect(project.id).toBeTypeOf('string');
    if (!project.id) return;
    const stage = await controllers['ProjectStage'].create({
      projectId: project.id,
      title: 'Test Stage',
      defaultMetadata: {
        durationExecution: 1,
        durationPreparation: 1,
        durationSetup: 1,
        efficiencyEstimated: 1,
        numberOfOutputParts: 1,
        numberOfSetups: 1,
      },
    });
    expect(stage.success).toBe(true);
    if (!stage.id) return;
    const updatedStage = await controllers['ProjectStage'].update(stage.id, {
      title: 'Test Stage 2',
      defaultMetadata: {
        durationExecution: 1,
        durationPreparation: 1,
        durationSetup: 1,
        efficiencyEstimated: 1,
        numberOfOutputParts: 1,
        numberOfSetups: 1,
      },
    });
    expect(updatedStage.success).toBe(true);
  });
  it('Update / with invalid id [Fail]', async () => {
    const updatedStage = await controllers['ProjectStage'].update('invalid-id', {
      title: 'Test Stage 2',
      defaultMetadata: {
        durationExecution: 1,
        durationPreparation: 1,
        durationSetup: 1,
        efficiencyEstimated: 1,
        numberOfOutputParts: 1,
        numberOfSetups: 1,
      },
    });
    expect(updatedStage.success).toBe(false);
  });
  it('Delete / correct input [Success]', async () => {
    const client = await controllers['Client'].create({
      name: 'John Doe',
    });
    expect(client.id).toBeTypeOf('string');
    if (!client.id) return;
    const project = await controllers['Project'].create({
      clientId: client.id,
      code: 'TEST',
      title: 'Test Project',
      quantity: 100,
    });
    expect(project.id).toBeTypeOf('string');
    if (!project.id) return;
    const stage = await controllers['ProjectStage'].create({
      projectId: project.id,
      title: 'Test Stage',
      defaultMetadata: {
        durationExecution: 1,
        durationPreparation: 1,
        durationSetup: 1,
        efficiencyEstimated: 1,
        numberOfOutputParts: 1,
        numberOfSetups: 1,
      },
    });
    expect(stage.success).toBe(true);
    if (!stage.id) return;
    const deletedStage = await controllers['ProjectStage'].delete(stage.id);
    expect(deletedStage.success).toBe(true);
  });
  it('Delete / with invalid id [Fail]', async () => {
    const deletedStage = await controllers['ProjectStage'].delete('invalid-id');
    expect(deletedStage.success).toBe(false);
  });
});
