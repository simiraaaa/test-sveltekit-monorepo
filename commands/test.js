// NOTE: Please call on npm scripts
import { spawn } from "node:child_process";
console.log(
  "🚨",
  process.argv,
  process.argv0,
  process.execArgv,
  `【process.argv, process.argv0, process.execArgv】`
);

console.log("🚨", import.meta.url, `【import.meta.url】`);

const _u = new URL(import.meta.url);
console.log("🚨", _u.pathname, `【_u.pathname】`);
const args = process.argv.slice(process.argv.indexOf(_u.pathname) + 1);
console.log("🚨", args, `【args】`);
const log = spawn(`cd apps/repo1 && vite dev`, [], {
  shell: true,
  stdio: "inherit",
});
