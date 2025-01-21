process.env.MODE = "TEST_MODE";

// NOTE: Please call on npm scripts
import { spawn } from "node:child_process";


const log = spawn(`echo $MODE`, [], {
  shell: true,
  stdio: "inherit",
});
