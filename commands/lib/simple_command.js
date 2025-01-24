import { spawn } from "node:child_process";

/** @typedef {{id: string, command: string, defaultOptionKey: string, optionMap: Record<string, string[]>, help: string}} CommandPattern */

/**
 * コマンドを実行する
 * @param {{name: string, command_patterns: CommandPattern[]}} param0
 */
export function runCommand({ name, command_patterns }) {
  function log_help() {
    console.log("Usage:");
    console.log(
      `\tnpm run ${name} ${command_patterns
        .map((pattern) => `[${pattern.id}]`)
        .join(" ")}`
    );
    console.log("");
    log_available_args();
  }

  /** 利用可能な引数の一覧を表示する */
  function log_available_args() {
    console.log("Available arguments:");
    for (const pattern of command_patterns) {
      console.log(
        `\t[${pattern.id}]\t${Object.keys(pattern.optionMap).join(", ")} (default: ${pattern.defaultOptionKey})`
      );
    }
  }

  /**
   * コマンドを作成する
   * @param {{command: string, options: string[]}} command
   * @returns {string}
   */
  function build_command(command) {
    return `${command.command} ${command.options?.join(" ") || ""}`;
  }

  if (process.env.npm_lifecycle_event === undefined) {
    console.error("Please call on npm scripts.");
    console.error(`  e.g.) \`npm run ${name}\``);
    process.exit(1);
  }

  const args = process.argv.slice(2);

  // ヘルプフラグがある場合はヘルプを表示して終了する
  if (args.includes("help")) {
    log_help();
    process.exit(0);
  }

  const received_args = {};

  const unmatched_args = [];

  // 引数を解析する
  for (const arg of args) {
    let matched_id;
    for (const pattern of command_patterns) {
      if (pattern.optionMap[arg]) {
        matched_id = pattern.id;
        break;
      }
    }
    if (matched_id) {
      if (received_args[matched_id]) {
        console.error(
          `The argument for ${matched_id} has already been received (${received_args[matched_id]} and ${arg}).\nOnly one ${matched_id} can be specified.`
        );
        log_available_args();
        process.exit(1);
      }
      received_args[matched_id] = arg;
    } else {
      unmatched_args.push(arg);
    }
  }

  // サポートされていない引数がある場合はエラーを出す
  if (unmatched_args.length > 0) {
    console.error(
      `The following arguments are not supported: ${unmatched_args.join(", ")}`
    );
    log_available_args();
    process.exit(1);
  }

  const commands = command_patterns.map((pattern) => {
    const command = {
      id: pattern.id,
      command: pattern.command,
      input_arg: received_args[pattern.id] || "(empty)",
      options:
        pattern.optionMap[
          received_args[pattern.id] || pattern.defaultOptionKey
        ] || [],
    };
    return command;
  });

  // 実行前ログ
  console.log(`Running:`);
  for (const command of commands) {
    console.log(
      `  [${command.id}]: ${command.input_arg} (${command.command} ${command.options.join(" ")})`
    );
  }

  const command = commands
    .map((command) => build_command(command))
    .join(" && ");

  console.log(`> ${command}\n`);

  // 実行
  return spawn(command, [], {
    shell: true,
    stdio: "inherit",
  }).on("exit", (code) => {
    if (code === 127) {
      console.error("Please run `yarn` before running this command.");
    }
  });
}
