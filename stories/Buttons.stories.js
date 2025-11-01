const defaultStory = {
  title: 'Components/Buttons',
  render: () => {
    const el = document.createElement('button');
    el.textContent = 'A button';
    return el;
  }
};

export default defaultStory;

export const ButtonAlone = {
  parameters: {
    docs: {
      description: {
        story: 'A single button on a toolbar.'
      }
    }
  }
};
