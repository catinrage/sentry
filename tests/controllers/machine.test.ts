import { describe, it, expect } from 'vitest';
import controllers from '@controllers';

describe('MachineService', () => {
  it('Create / correct input [Success]', async () => {
    const machine = await controllers['Machine'].create({
      name: 'Test Machine',
      type: 'CNC_MILLING',
    });
    expect(machine.success).toBe(true);
  });
  it('Create / with duplicate name [Fail]', async () => {
    const machine = await controllers['Machine'].create({
      name: 'Test Machine',
      type: 'CNC_TURNING',
    });
    const machineWithTheSameName = await controllers['Machine'].create({
      name: 'Test Machine',
      type: 'CNC_TURNING',
    });
    expect(machineWithTheSameName.success).toBe(false);
  });
  it('Update / correct input [Success]', async () => {
    const machine = await controllers['Machine'].create({
      name: 'Test Machine',
      type: 'CNC_MILLING',
    });
    expect(machine.id).toBeTypeOf('string');
    if (!machine.id) return;
    console.log({ machine });
    const updatedMachine = await controllers['Machine'].update(machine.id, {
      name: 'Test Machine 2',
      type: 'CNC_TURNING',
    });
    console.log(updatedMachine.errors);

    expect(updatedMachine.success).toBe(true);
  });
  it('Update / with duplicate name [Fail]', async () => {
    const machine = await controllers['Machine'].create({
      name: 'Test Machine',
      type: 'CNC_MILLING',
    });
    const machine2 = await controllers['Machine'].create({
      name: 'Test Machine 2',
      type: 'CNC_TURNING',
    });
    expect(machine.id).toBeTypeOf('string');
    if (!machine.id) return;
    const updatedMachine = await controllers['Machine'].update(machine.id, {
      name: 'Test Machine 2',
      type: 'CNC_TURNING',
    });
    expect(updatedMachine.success).toBe(false);
  });
  it('Delete / correct input [Success]', async () => {
    const machine = await controllers['Machine'].create({
      name: 'Test Machine',
      type: 'CNC_MILLING',
    });
    expect(machine.id).toBeTypeOf('string');
    if (!machine.id) return;
    const deletedMachine = await controllers['Machine'].delete(machine.id);
    expect(deletedMachine.success).toBe(true);
  });
  it('Delete / with invalid id [Fail]', async () => {
    const machine = await controllers['Machine'].create({
      name: 'Test Machine',
      type: 'CNC_MILLING',
    });
    const deletedMachine = await controllers['Machine'].delete('invalid-id');
    expect(deletedMachine.success).toBe(false);
  });
  // TODO: this should move to schedule test
  it('Delete / while has at least a schedule [Fail]', async () => {
    const machine = await controllers['Machine'].create({
      name: 'Test Machine',
      type: 'CNC_MILLING',
    });
    expect(machine.id).toBeTypeOf('string');
    if (!machine.id) return;
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
    expect(stage.id).toBeTypeOf('string');
    if (!stage.id) return;
    const schedule = await controllers['ProjectStageSchedule'].create({
      machineId: machine.id,
      stageId: stage.id,
      metadata: {
        durationExecution: 1,
        durationPreparation: 1,
        durationSetup: 1,
        efficiencyEstimated: 1,
        numberOfOutputParts: 1,
        numberOfSetups: 1,
      },
      quantity: 3,
      dateStartFixed: new Date(),
    });
    const deletedMachine = await controllers['Machine'].delete(machine.id);
    expect(deletedMachine.success).toBe(false);
  });
});
