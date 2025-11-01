import { Component, Fragment, createElement } from 'react';
import { H3 } from 'storybook/internal/components';

export default class SmartUISettingsPanel extends Component {
  render() {
    const { active } = this.props;
    if (!active) return null;
    return createElement(
      Fragment,
      null,
      createElement(H3, null, 'Theme')
    );
  }
}
