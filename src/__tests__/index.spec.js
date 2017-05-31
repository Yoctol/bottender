import * as core from '../index';

describe('core', () => {
  it('export Bots', () => {
    expect(core.MessengerBot).toBeDefined();
    expect(core.LINEBot).toBeDefined();
  });

  it('export handler builders', () => {
    expect(core.BasicHandlerBuilder).toBeDefined();
    expect(core.MessengerHandlerBuilder).toBeDefined();
    expect(core.LINEHandlerBuilder).toBeDefined();
  });

  it('export verifyMessengerWebhook', () => {
    expect(core.verifyMessengerWebhook).toBeDefined();
  });
});
