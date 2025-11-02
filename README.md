# Error Building Storybook Project

This repository contains a minimum Storybook project to demonstrate this build error, which started occurring after upgrading from Storybook 9 to 10 and ws reported as [#32918](https://github.com/storybookjs/storybook/issues/32918):

```
Failed to load preset: {"type":"presets","name":"/Users/ferdipr/Sources/github/storybook-document-error/addons/smartui/register.js"} on level 1
ReferenceError: document is not defined
  at file://./node_modules/storybook/dist/_browser-chunks/chunk-I74EUU5O.js:4491:12
```

How to reproduce it:

    git clone https://github.com/prantlf/storybook-document-error.git
    cd storybook-document-error
    npm ci
    npm run build

The error disappears, if the following two lines in `addons/smartui/panel.js` are commented out:

```js
import { Component, Fragment, createElement } from 'react';
// import { H3 } from 'storybook/internal/components';

export default class SmartUISettingsPanel extends Component {
  render() {
    const { active } = this.props;
    if (!active) return null;
    return createElement(
      Fragment,
      null,
      // createElement(H3, null, 'Theme')
    );
  }
}
```

It appears that the code in `storybook/internal/components` accesses `document` during the build time.

This project includes the addon in a subdirectory instead of in a separate NPM package `@smartui/storybook`.

The full console output:

```
❯ npm run build

> build
> storybook build

storybook v10.0.2

info => Cleaning outputDir: storybook-static
info => Loading presets
SB_CORE-SERVER_0002 (CriticalPresetLoadError): Storybook failed to load the following preset: ./.storybook/main.js.

Please check whether your setup is correct, the Storybook dependencies (and their peer dependencies) are installed correctly and there are no package version clashes.

If you believe this is a bug, please open an issue on Github.

SB_CORE-SERVER_0002 (CriticalPresetLoadError): Storybook failed to load the following preset: ./addons/smartui/register.js.

Please check whether your setup is correct, the Storybook dependencies (and their peer dependencies) are installed correctly and there are no package version clashes.

If you believe this is a bug, please open an issue on Github.

ReferenceError: document is not defined
    at file://./node_modules/storybook/dist/_browser-chunks/chunk-I74EUU5O.js:4491:12
    at ModuleJob.run (node:internal/modules/esm/module_job:377:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:691:26)
    at async importModule (file://./node_modules/storybook/dist/_node-chunks/chunk-VOOIMEQA.js:1506:11)
    at async loadPreset (file://./node_modules/storybook/dist/_node-chunks/chunk-TLGQ3DFY.js:10715:20)
    at async Promise.all (index 1)
    at async loadPresets (file://./node_modules/storybook/dist/_node-chunks/chunk-TLGQ3DFY.js:10777:11)
    at async loadPreset (file://./node_modules/storybook/dist/_node-chunks/chunk-TLGQ3DFY.js:10744:12)
    at async Promise.all (index 2)
    at async loadPresets (file://./node_modules/storybook/dist/_node-chunks/chunk-TLGQ3DFY.js:10777:11)

More info:

    at loadPreset (file://./node_modules/storybook/dist/_node-chunks/chunk-TLGQ3DFY.js:10761:13)
    at async Promise.all (index 1)
    at async loadPresets (file://./node_modules/storybook/dist/_node-chunks/chunk-TLGQ3DFY.js:10777:11)
    at async loadPreset (file://./node_modules/storybook/dist/_node-chunks/chunk-TLGQ3DFY.js:10744:12)
    at async Promise.all (index 2)
    at async loadPresets (file://./node_modules/storybook/dist/_node-chunks/chunk-TLGQ3DFY.js:10777:11)
    at async getPresets (file://./node_modules/storybook/dist/_node-chunks/chunk-TLGQ3DFY.js:10827:25)
    at async buildStaticStandalone (file://./node_modules/storybook/dist/core-server/index.js:9794:17)
    at async withTelemetry (file://./node_modules/storybook/dist/_node-chunks/chunk-CJ3GT3HG.js:278:12)
    at async build (file://./node_modules/storybook/dist/bin/core.js:3596:3)

More info:

    at loadPreset (file://./node_modules/storybook/dist/_node-chunks/chunk-TLGQ3DFY.js:10761:13)
    at async Promise.all (index 2)
    at async loadPresets (file://./node_modules/storybook/dist/_node-chunks/chunk-TLGQ3DFY.js:10777:11)
    at async getPresets (file://./node_modules/storybook/dist/_node-chunks/chunk-TLGQ3DFY.js:10827:25)
    at async buildStaticStandalone (file://./node_modules/storybook/dist/core-server/index.js:9794:17)
    at async withTelemetry (file://./node_modules/storybook/dist/_node-chunks/chunk-CJ3GT3HG.js:278:12)
    at async build (file://./node_modules/storybook/dist/bin/core.js:3596:3)
    at async _Command.<anonymous> (file://./node_modules/storybook/dist/bin/core.js:3754:3)
  Failed to load preset: {"type":"presets","name":"/Users/ferdipr/Sources/github/storybook-document-error/addons/smartui/register.js"} on level 1
ReferenceError: document is not defined
    at file://./node_modules/storybook/dist/_browser-chunks/chunk-I74EUU5O.js:4491:12
    at ModuleJob.run (node:internal/modules/esm/module_job:377:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:691:26)
    at async importModule (file://./node_modules/storybook/dist/_node-chunks/chunk-VOOIMEQA.js:1506:11)
    at async loadPreset (file://./node_modules/storybook/dist/_node-chunks/chunk-TLGQ3DFY.js:10715:20)
    at async Promise.all (index 1)
    at async loadPresets (file://./node_modules/storybook/dist/_node-chunks/chunk-TLGQ3DFY.js:10777:11)
    at async loadPreset (file://./node_modules/storybook/dist/_node-chunks/chunk-TLGQ3DFY.js:10744:12)
    at async Promise.all (index 2)
    at async loadPresets (file://./node_modules/storybook/dist/_node-chunks/chunk-TLGQ3DFY.js:10777:11)
```

## Storybook 9

This is the branch `master`, which shows the error. If you want to see how the same sources working, switch to the branch `storybook9`. It builds well and displays the panel addon:

![Smart UI Panel](./smartui-panel.png)
