import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// Get the current file's URL and path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host', // name of your host
      filename: 'remoteEntry.js',
      exposes: {
        './Layout': './src/components/layout/Layout.tsx',
      },
      remotes: {
        // e.g. tools: "http://localhost:3001/assets/remoteEntry.js"
        // leave empty if just starting out as host only
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-router-dom': { singleton: true },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
