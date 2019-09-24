import SlackHandler from '../SlackHandler';

const setup = () => {
  const builder = new SlackHandler();
  return {
    builder,
  };
};

describe('#constructor', () => {
  it('should construct without error', () => {
    const { builder } = setup();
    expect(SlackHandler).toBeDefined();
    expect(builder).toBeInstanceOf(SlackHandler);
  });
});
