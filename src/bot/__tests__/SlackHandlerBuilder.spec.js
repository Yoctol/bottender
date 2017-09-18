import SlackHandlerBuilder from '../SlackHandlerBuilder';

const setup = () => {
  const builder = new SlackHandlerBuilder();
  return {
    builder,
  };
};

describe('#constructor', () => {
  it('should construct without error', () => {
    const { builder } = setup();
    expect(SlackHandlerBuilder).toBeDefined();
    expect(builder).toBeInstanceOf(SlackHandlerBuilder);
  });
});
