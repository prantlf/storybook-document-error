import React from 'react';
import { addons, types } from 'storybook/manager-api';
import { ADDON_ID, PANEL_ID } from './constants.js';
import SmartUISettingsPanel from './panel.js';

addons.register(ADDON_ID, api => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Smart UI',
    render: ({ active }) =>
      React.createElement(SmartUISettingsPanel, {
        active,
        key: PANEL_ID,
        api
      })
  });
});
