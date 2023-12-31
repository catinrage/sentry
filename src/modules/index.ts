import { loadFilesSync } from '@graphql-tools/load-files';
import { join } from 'path';

let loadedModules = loadFilesSync(join(import.meta.dir, './*/index.ts'));
loadedModules = loadedModules.map((module) => {
  for (const key in module) {
    if (key.startsWith('__')) {
      continue;
    }
    return module[key];
  }
});

export default loadedModules;
