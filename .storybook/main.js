export default {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-docs',
    '../addons/smartui/register.js'
  ],
  core: {
    disableTelemetry: true,
    enableCrashReports: false
  },
  framework: {
    name: '@storybook/html-vite'
  }
};
