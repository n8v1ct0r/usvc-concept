import path from 'node:path';

import { defineConfig } from 'vitest/config';

// Unit tests for the pure logic in src/lib and src/data (no React Native imports).
export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});
