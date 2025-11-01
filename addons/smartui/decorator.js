import { makeDecorator } from 'storybook/preview-api';

export const withSmartUISettings = makeDecorator({
  name: 'withSmartUISettings',
  wrapper: (getStory, context) => {
    return getStory(context);
  }
});
