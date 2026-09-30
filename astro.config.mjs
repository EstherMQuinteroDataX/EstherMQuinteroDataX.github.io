// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Web publicada en https://EstherMQuinteroDataX.github.io
// (el repositorio debe llamarse EstherMQuinteroDataX.github.io)
export default defineConfig({
  site: 'https://esthermquinterodatax.github.io',
  base: '/',
  integrations: [react()],
});
