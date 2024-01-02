import errors from '@errors';
import { MutationResponse } from 'src/codegen/graphql';

import clientInspector from '../modules/Client/inspector';
import machineInspector from '../modules/Machine/inspector';
import projectInspector from '../modules/Project/inspector';
import projectStageInspector from '../modules/ProjectStage/inspector';
import projectStageScheduleInspector from '../modules/ProjectStageSchedule/inspector';
import projectStageScheduleInterruption from '../modules/ProjectStageScheduleInterruption/inspector';
import projectStageScheduleMetadata from '../modules/ProjectStageScheduleMetadata/inspector';

const inspectors = {
  Client: clientInspector,
  Machine: machineInspector,
  Project: projectInspector,
  ProjectStage: projectStageInspector,
  ProjectStageSchedule: projectStageScheduleInspector,
  ProjectStageScheduleInterruption: projectStageScheduleInterruption,
  ProjectStageScheduleMetadata: projectStageScheduleMetadata,
};

export class Inspectors {
  static get(model: keyof typeof inspectors) {
    const inspector = inspectors[model];

    return {
      at: (action: Exclude<keyof typeof inspector, 'extends'>) => {
        return {
          execute: async function <T, P extends { id: string }>(
            data: T,
            callback: (data: T) => Promise<P>,
          ): Promise<MutationResponse> {
            try {
              for (const inspector of Object.values(inspectors)) {
                if (inspector.extends) {
                  const extensions = inspector.extends[model];
                  if (extensions) {
                    if (extensions[action] !== undefined) {
                      await extensions[action].parseAsync(data);
                    }
                  }
                }
              }
              const section = inspector[action];
              if (!section) throw new Error(`Action ${action} is not defined for model ${model}`);
              await section.parseAsync(data);
              const { id } = await callback(data);
              return {
                id,
                errors: [],
                success: true,
              };
            } catch (error) {
              return errors.handle(error);
            }
          },
        };
      },
    };
  }
}
