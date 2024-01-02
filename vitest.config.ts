// vitest.config.integration.ts
import { defineConfig } from 'vitest/config';
import ViteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    setupFiles: ['tests/helpers/setup.ts'],
    sequence: {
      concurrent: false,
      hooks: 'list',
    },
    poolOptions: {
      threads: {
        isolate: true,
        singleThread: true,
      },
    },
  },
  plugins: [ViteTsconfigPaths()],
});
