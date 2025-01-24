// NOTE: Please call on npm scripts

import { appPattern } from "./lib/patterns/apps.js";
import { runCommand } from "./lib/simple_command.js";

const DEFAULT_MODE = "dev";

runCommand({
  name: "dev",
  command_patterns: [
    appPattern,
    {
      id: "mode",
      command: "vite dev",
      defaultOptionKey: DEFAULT_MODE,
      optionMap: {
        dev: ["--mode=development"],
        stg: ["--mode=staging"],
        prod: ["--mode=production"],
      },
    },
  ],
});
