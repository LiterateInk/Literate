import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { internalIpV4 } from 'internal-ip';
import path from "node:path";
import c from "chalk";

import { findLocalIP } from "./utils/network.js";
import { warn, done, header } from "./utils/logger.js";
import { makeViteServer, removePreviousBuild } from "./utils/vite.js";
import { appendLiveReloadProperties, readCurrentConfiguration, writeConfiguration } from "./utils/capacitor.js";
import { adbInstallApk, adbOpenApp, adbRemoveReversePort, adbReversePort, adbStartServer, adbUninstallApp, findAdbBinaryPath } from "./utils/adb.js";

const ROOT_DIRECTORY = fileURLToPath(new URL('..', import.meta.url));

const ANDROID_HOME = process.env.ANDROID_HOME;
if (!ANDROID_HOME) throw new Error("ANDROID_HOME is not defined");

const SHOULD_REVERSE = process.argv.includes("--localhost");
const VITE_PORT = 3000;

// 0. Find what host to use for the development server.
const HOSTNAME = SHOULD_REVERSE ? "localhost" : await internalIpV4();
if (HOSTNAME !== "localhost") {
  warn("Will use", c.yellow(HOSTNAME), "as the host for the development server since '--localhost' parameter was not given.");
}

// 1. Prepare the development environment.
header("ANDROID(DEV) - PREPARE ENVIRONMENT");

// 1.1. Remove the previous build.
await removePreviousBuild(ROOT_DIRECTORY);

// 1.2. Prepare the temporary configuration for live reload.
const originalConfig = await readCurrentConfiguration(ROOT_DIRECTORY);
const temporaryLiveReloadConfig = appendLiveReloadProperties(originalConfig, HOSTNAME, VITE_PORT);
await writeConfiguration(ROOT_DIRECTORY, temporaryLiveReloadConfig);
done("Wrote temporary configuration.");

// 1.3. Sync the temporary configuration with the project.
execSync("npx cap sync");
done("Synced the temporary configuration. Will revert the configuration now.");

// 1.4. Revert the configuration back to the original.
await writeConfiguration(ROOT_DIRECTORY, originalConfig);
done("Reverted the configuration.");

// 2. Make a debug build.
header("ANDROID(DEV) - DEBUG BUILD");
warn("Will build the debug APK using Gradle, this may take a while.");

// 2.1. Build the debug APK using Gradle.
// Logs are shown in the console.
execSync("./gradlew assembleDebug", { cwd: path.join(ROOT_DIRECTORY, "android"), stdio: "inherit" });

// 2.2. Locate the debug APK.
const apkFilePath = path.join(ROOT_DIRECTORY, "android", "app", "build", "outputs", "apk", "debug", "app-debug.apk");
done("Built the debug APK at", apkFilePath);

// 2.3. Install the debug APK to the attached device.
const adbBinaryPath = findAdbBinaryPath(ANDROID_HOME);

// 2.4. Ensure the ADB server is running.
adbStartServer(adbBinaryPath);

// 2.5. Install the APK.
adbInstallApk(adbBinaryPath, apkFilePath);

// 2.6. Reverse the port, if necessary.
if (SHOULD_REVERSE) adbReversePort(adbBinaryPath, VITE_PORT);

// 3. Start the development server.
header("ANDROID(DEV) - VITE");

// 3.1. Create and start the Vite development server.
const server = await makeViteServer(ROOT_DIRECTORY, HOSTNAME, VITE_PORT);
await server.listen();
done(`Vite development server is running on http://${HOSTNAME}:${VITE_PORT}`);

// 3.2. Open the app on the device.
adbOpenApp(adbBinaryPath, temporaryLiveReloadConfig.appId);

const shutdown = () => {
  header("ANDROID(DEV) - SHUTDOWN");
  warn("Gracefully shutting down the development environment.");

  server.close().then(() => {
    done("Closed Vite development server.");

    if (SHOULD_REVERSE) adbRemoveReversePort(adbBinaryPath, VITE_PORT);
    adbUninstallApp(adbBinaryPath, temporaryLiveReloadConfig.appId);

    warn("Cleaned up the development environment, exiting now.");
    process.exit(0);
  })
}

// 4. Gracefully shutdown when the user ends the process.
process
  .on('SIGTERM', shutdown)
  .on('SIGINT', shutdown)
  .on('uncaughtException', shutdown);
