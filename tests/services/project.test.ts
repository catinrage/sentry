import { describe, it, expect } from 'vitest';
import {
  ClientService,
  MachineService,
  ProjectService,
  ProjectStageScheduleService,
  ProjectStageService,
} from '../../src/aliases/services';

describe('ProjectService', () => {
  it('should create a project', async () => {
    expect(1 + 1, 'WTF ?').toBe(2);
  });
});
