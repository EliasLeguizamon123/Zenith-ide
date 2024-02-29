import { defineConfig } from 'astro/config';
import electron from "astro-electron";
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

const prefix = `monaco-editor/esm/vs`;

// https://astro.build/config
export default defineConfig({
  integrations: [electron(), tailwind(), icon()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          jsWorker: [`${prefix}/language/javascript/js.worker`],
          jsonWorker: [`${prefix}/language/json/json.worker`],
          cssWorker: [`${prefix}/language/css/css.worker`],
          htmlWorker: [`${prefix}/language/html/html.worker`],
          tsWorker: [`${prefix}/language/typescript/ts.worker`],
          editorWorker: [`${prefix}/editor/editor.worker`],
        }
      }
    }
  }
});