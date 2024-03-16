import { createServer } from "vite";
import { done } from "./logger.js";
import fs from "node:fs/promises";
import path from "node:path";

/**
 * @param {string} rootDirectory
 */
export const removePreviousBuild = async (rootDirectory) => {
  await fs.rm(path.join(rootDirectory, "dist"), { recursive: true, force: true });
  done("Removed previous Vite build");
}

export const makeViteServer = async (rootDirectory, host, port) => {
  const server = await createServer({
    configFile: path.join(rootDirectory, "vite.config.ts"),
    root: path.join(rootDirectory),

    mode: "development",
    clearScreen: false,
    server: {
      host, port,
      strictPort: true,

      watch: {
        ignored: ["**/android/**"]
      }
    },

    customLogger: {
      info: (message) => {
        console.info("INFO:", message);
      },

      warn: (message) => {
        console.warn("WARN:", message);
      },

      error: (message) => {
        console.error("ERROR:", message);
      }
    }
  });

  return server;
};
