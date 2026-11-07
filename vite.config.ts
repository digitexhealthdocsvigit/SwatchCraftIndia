import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// SECURITY: GEMINI_API_KEY is intentionally NOT injected via `define`.
// Anything placed in `define` is embedded in the public browser bundle.
// Gemini calls must go through a server-side proxy (e.g. a Vercel function).
export default defineConfig(() => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
