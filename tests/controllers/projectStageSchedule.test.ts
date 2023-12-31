import { describe, it, expect } from 'vitest';
import controllers from '@controllers';

describe('ProjectStageSchedule Controller', () => {
  it('Create / correct input [Success]', async () => {
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
    expect(schedule.success).toBe(true);
  });
  it('Create / with invalid machine id [Fail]', async () => {
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
      machineId: 'invalid-id',
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
    expect(schedule.success).toBe(false);
  });
  it('Create / with invalid stage id [Fail]', async () => {
    const machine = await controllers['Machine'].create({
      name: 'Test Machine',
      type: 'CNC_MILLING',
    });
    expect(machine.id).toBeTypeOf('string');
    if (!machine.id) return;
    const schedule = await controllers['ProjectStageSchedule'].create({
      machineId: machine.id,
      stageId: 'invalid-id',
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
    expect(schedule.success).toBe(false);
  });
  it('Create / with no fixed date start and previous schedule id [Fail]', async () => {
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
    });
    expect(schedule.success).toBe(false);
  });
  it('Create / with both fixed date start and previous schedule id [Fail]', async () => {
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
    const schedule1 = await controllers['ProjectStageSchedule'].create({
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
    if (!schedule1.id) return;
    const schedule2 = await controllers['ProjectStageSchedule'].create({
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
      previousId: schedule1.id,
    });
    expect(schedule2.success).toBe(false);
  });
  it('Create / with invalid previous schedule id [Fail]', async () => {
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
      previousId: 'invalid-id',
    });
    expect(schedule.success).toBe(false);
  });
  it('Create / with previous schedule is occupied [Fail]', async () => {
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
    const schedule1 = await controllers['ProjectStageSchedule'].create({
      machineId: machine.id,
      stageId: stage.id,
      metadata: {
        durationExecution: 2,
        durationPreparation: 2,
        durationSetup: 2,
        efficiencyEstimated: 1,
        numberOfOutputParts: 2,
        numberOfSetups: 2,
      },
      quantity: 3,
      dateStartFixed: new Date(),
    });
    expect(schedule1.id).toBeTypeOf('string');
    if (!schedule1.id) return;
    const schedule2 = await controllers['ProjectStageSchedule'].create({
      machineId: machine.id,
      stageId: stage.id,
      metadata: {
        durationExecution: 2,
        durationPreparation: 2,
        durationSetup: 2,
        efficiencyEstimated: 1,
        numberOfOutputParts: 2,
        numberOfSetups: 2,
      },
      quantity: 3,
      previousId: schedule1.id,
    });
    expect(schedule2.id).toBeTypeOf('string');
    if (!schedule2.id) return;
    const schedule3 = await controllers['ProjectStageSchedule'].create({
      machineId: machine.id,
      stageId: stage.id,
      metadata: {
        durationExecution: 2,
        durationPreparation: 2,
        durationSetup: 2,
        efficiencyEstimated: 1,
        numberOfOutputParts: 2,
        numberOfSetups: 2,
      },
      quantity: 3,
      previousId: schedule1.id,
    });
    expect(schedule3.success).toBe(false);
  });
  it('Create / with interference [Fail]', async () => {
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
    const schedule1 = await controllers['ProjectStageSchedule'].create({
      machineId: machine.id,
      stageId: stage.id,
      metadata: {
        durationExecution: 45,
        durationPreparation: 15,
        durationSetup: 60,
        efficiencyEstimated: 1,
        numberOfOutputParts: 1,
        numberOfSetups: 2,
      },
      quantity: 23,
      dateStartFixed: new Date(),
    });
    expect(schedule1.id).toBeTypeOf('string');
    if (!schedule1.id) return;
    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 23);
    const schedule2 = await controllers['ProjectStageSchedule'].create({
      machineId: machine.id,
      stageId: stage.id,
      metadata: {
        durationExecution: 2,
        durationPreparation: 2,
        durationSetup: 2,
        efficiencyEstimated: 1,
        numberOfOutputParts: 2,
        numberOfSetups: 2,
      },
      quantity: 3,
      dateStartFixed: currentDate,
    });
    expect(schedule2.success).toBe(false);
  });
});
