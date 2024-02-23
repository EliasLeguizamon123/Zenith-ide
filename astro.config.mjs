import { defineConfig } from 'astro/config';
import electron from "astro-electron";
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [electron(), tailwind(), icon()]
});