import { loadFilesSync } from '@graphql-tools/load-files';
import { join } from 'path';

let loadedModules = loadFilesSync(join(__dirname, './*/index.ts'));
loadedModules = loadedModules.map((module) => {
  for (const key in module) {
    if (key.startsWith('__')) {
      continue;
    }
    return module[key];
  }
});

export default loadedModules;

export * as common from './common';
export * as client from './client';
export * as machine from './machine';
