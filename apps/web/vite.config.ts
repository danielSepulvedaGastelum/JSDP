
import { defineConfig, type Plugin } from 'vite';
import { writeFile } from 'node:fs/promises';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Only the local design picker can persist one of these known animation profiles.
function motionPicker(): Plugin {
  const profiles = new Set(['soft', 'depth', 'slide', 'layers', 'curtain']);
  const choiceFile = new URL('./src/app/router/motion-choice.ts', import.meta.url);
  return {
    name: 'jsdp-motion-picker',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__jsdp-motion/choice', async (request, response) => {
        const reply = (status: number, body: object) => {
          response.statusCode = status;
          response.setHeader('Content-Type', 'application/json; charset=utf-8');
          response.setHeader('Cache-Control', 'no-store');
          response.end(JSON.stringify(body));
        };
        if (request.method !== 'POST') { reply(405, { error: 'method' }); return; }
        const address = request.socket.remoteAddress;
        if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(address ?? '') ||
            request.headers.origin !== 'http://' + request.headers.host) {
          reply(403, { error: 'origin' }); return;
        }
        try {
          let body = '';
          for await (const chunk of request) {
            body += chunk.toString();
            if (body.length > 1024) { reply(413, { error: 'size' }); return; }
          }
          const { profile } = JSON.parse(body);
          if (!profiles.has(profile)) { reply(400, { error: 'profile' }); return; }
          await writeFile(choiceFile, "export const chosenMotion = '" + profile + "';\n", 'utf8');
          reply(200, { profile });
        } catch { reply(400, { error: 'request' }); }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), motionPicker()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
});
