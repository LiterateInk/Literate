import fs from "node:fs/promises";
import path from "node:path";

const CAPACITOR_CONFIG_PATH = "capacitor.config.json";

/**
 * @param {string} rootDirectory
 * @returns {Promise<import("@capacitor/cli").CapacitorConfig>}
 */
export const readCurrentConfiguration = async (rootDirectory) => {
  const configPath = path.join(rootDirectory, CAPACITOR_CONFIG_PATH);
  const raw = await fs.readFile(configPath, { encoding: "utf-8" });
  
  return JSON.parse(raw);
};

/**
 * @param {import("@capacitor/cli").CapacitorConfig} config 
 * @param {string} host
 * @param {number} port
 * @returns {import("@capacitor/cli").CapacitorConfig}
 */
export const appendLiveReloadProperties = (config, host, port) => {
  return {
    ...config,
    server: {
      url: `http://${host}:${[port]}`,
      cleartext: true
    }
  };
};

/**
 * @param {string} rootDirectory
 * @param {import("@capacitor/cli").CapacitorConfig} config  
 * @returns {Promise<void>}
 */
export const writeConfiguration = async (rootDirectory, config) => {
  const configPath = path.join(rootDirectory, CAPACITOR_CONFIG_PATH);
  await fs.writeFile(configPath, JSON.stringify(config, null, 2));
}
