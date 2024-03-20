import { defineConfig } from 'vite';

import icons from "unplugin-icons/vite";
import solid from 'vite-plugin-solid';
import unocss from 'unocss/vite';

import path from "node:path";

export default defineConfig({
  plugins: [
    unocss(),
    icons({ compiler: 'solid' }),
    solid()
  ],

  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src")
    }
  },
});
