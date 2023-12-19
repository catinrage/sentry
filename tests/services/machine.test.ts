import { describe, it, expect } from 'vitest';
import {
  ClientService,
  MachineService,
  ProjectService,
  ProjectStageScheduleService,
  ProjectStageService,
} from '../../src/aliases/services';

describe('MachineService', () => {
  it('Create / correct input [Success]', async () => {
    const machine = await MachineService.create({
      name: 'Test Machine',
      type: 'CNC_MILLING',
    });
    expect(machine.success).toBe(true);
  });
  it('Create / with duplicate name [Fail]', async () => {
    const machine = await MachineService.create({
      name: 'Test Machine',
      type: 'CNC_TURNING',
    });
    const machineWithTheSameName = await MachineService.create({
      name: 'Test Machine',
      type: 'CNC_TURNING',
    });
    expect(machineWithTheSameName.success).toBe(false);
  });
  it('Update / correct input [Success]', async () => {
    const machine = await MachineService.create({
      name: 'Test Machine',
      type: 'CNC_MILLING',
    });
    expect(machine.id).toBeTypeOf('string');
    if (!machine.id) return;
    const updatedMachine = await MachineService.update(machine.id, {
      name: 'Test Machine 2',
      type: 'CNC_TURNING',
    });
    expect(updatedMachine.success).toBe(true);
  });
  it('Update / with duplicate name [Fail]', async () => {
    const machine = await MachineService.create({
      name: 'Test Machine',
      type: 'CNC_MILLING',
    });
    const machine2 = await MachineService.create({
      name: 'Test Machine 2',
      type: 'CNC_TURNING',
    });
    expect(machine.id).toBeTypeOf('string');
    if (!machine.id) return;
    const updatedMachine = await MachineService.update(machine.id, {
      name: 'Test Machine 2',
      type: 'CNC_TURNING',
    });
    expect(updatedMachine.success).toBe(false);
  });
  it('Delete / correct input [Success]', async () => {
    const machine = await MachineService.create({
      name: 'Test Machine',
      type: 'CNC_MILLING',
    });
    expect(machine.id).toBeTypeOf('string');
    if (!machine.id) return;
    const deletedMachine = await MachineService.delete(machine.id);
    expect(deletedMachine.success).toBe(true);
  });
  it('Delete / with invalid id [Fail]', async () => {
    const machine = await MachineService.create({
      name: 'Test Machine',
      type: 'CNC_MILLING',
    });
    const deletedMachine = await MachineService.delete('invalid-id');
    expect(deletedMachine.success).toBe(false);
  });
  it('Delete / while has at least a schedule [Fail]', async () => {
    const machine = await MachineService.create({
      name: 'Test Machine',
      type: 'CNC_MILLING',
    });
    expect(machine.id).toBeTypeOf('string');
    if (!machine.id) return;
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
    expect(project.id).toBeTypeOf('string');
    if (!project.id) return;
    const stage = await ProjectStageService.create({
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
    const schedule = await ProjectStageScheduleService.create({
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
    const deletedMachine = await MachineService.delete(machine.id);
    expect(deletedMachine.success).toBe(false);
  });
});
