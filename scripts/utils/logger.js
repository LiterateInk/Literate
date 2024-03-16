import c from "chalk";

/**
 * @param {string[]} args 
 */
export const warn = (...args) => {
  console.warn(c.black.bold.bgYellow(" ! "), ...args);
}

/**
 * @param {string[]} args 
 */
export const done = (...args) => {
  console.info(c.black.bold.bgGreen(" ✔ "), ...args);
}

/**
 * @param {string} text 
 */
export const header = (text) => {
  console.info("\n" + c.black.bold.bgWhite(" LITERATE: " + text + " "));
}