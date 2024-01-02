import { ClientController } from '../modules/Client/controller';
import { MachineController } from '../modules/Machine/controller';
import { ProjectController } from '../modules/Project/controller';
import { ProjectStageController } from '../modules/ProjectStage/controller';
import { ProjectStageScheduleController } from '../modules/ProjectStageSchedule/controller';
import { ProjectStageScheduleInterruptionController } from '../modules/ProjectStageScheduleInterruption/controller';

export default {
  Client: new ClientController(),
  Machine: new MachineController(),
  Project: new ProjectController(),
  ProjectStage: new ProjectStageController(),
  ProjectStageSchedule: new ProjectStageScheduleController(),
  ProjectStageScheduleInterruption: new ProjectStageScheduleInterruptionController(),
};
