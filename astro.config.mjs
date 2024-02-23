import { defineConfig } from 'astro/config';
import electron from "astro-electron";

// https://astro.build/config
export default defineConfig({
    integrations: [electron()]
});
