/** @type {import('../../lib/simple_command.js').CommandPattern} */
export const appPattern = {
  id: "app",
  command: "cd",
  defaultOptionKey: "repo1",
  optionMap: {
    repo1: ["apps/repo1"],
    repo2: ["apps/repo2"],
    common: ["common"],
  },
};
