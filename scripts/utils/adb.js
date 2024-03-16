import path from "node:path";
import { done } from "./logger.js";
import { execSync } from "node:child_process";

/**
 * Grab the path to the ADB binary.
 * @param {string} androidHomePath 
 */
export const findAdbBinaryPath = (androidHomePath) => {
  const bin = path.join(androidHomePath, 'platform-tools', 'adb');
  done("Found ADB binary at", bin);
  
  return bin;
}

export const adbStartServer = (adbPath) => {
  execSync(`${adbPath} start-server`);
  done("ADB server is running");
};

export const adbInstallApk = (adbPath, apkPath) => {
  execSync(`${adbPath} install -r ${apkPath}`);
  done("Installed APK to attached device");
}

export const adbRemoveReversePort = (adbPath, port) => {
  try {
    execSync(`${adbPath} reverse --remove tcp:${port}`, { stdio: "ignore" });
  } catch { /** No-op. */ }
};

export const adbReversePort = (adbPath, port) => {
  adbRemoveReversePort(adbPath, port);
  
  execSync(`${adbPath} reverse tcp:${port} tcp:${port}`);
  done("Reversed port", port, "from host to device");
};

export const adbOpenApp = (adbPath, packageName) => {
  execSync(`${adbPath} shell monkey -p ${packageName} -c android.intent.category.LAUNCHER 1`, { stdio: "ignore" });
  done(`Opened the app (${packageName}) on the device`);
};

export const adbUninstallApp = (adbPath, packageName) => {
  execSync(`${adbPath} uninstall ${packageName}`);
  done(`Uninstalled the app (${packageName}) from the device`);
}