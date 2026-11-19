// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// output estático por defecto; rutas de servidor con `export const prerender = false`
export default defineConfig({
  output: 'static',
  adapter: node({ mode: 'standalone' }),
});
