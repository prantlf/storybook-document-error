import { join } from "node:path";

export default {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-docs"],
  managerEntries: [join(import.meta.dirname, "../addons/smartui/manager.js")],
  core: {
    disableTelemetry: true,
    enableCrashReports: false,
  },
  framework: {
    name: "@storybook/html-vite",
  },
};
