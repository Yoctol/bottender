import * as core from '../index';

describe('core', () => {
  it('export MessengerBot', () => {
    expect(core.MessengerBot).toBeDefined();
  });

  it('export LINEBot', () => {
    expect(core.LINEBot).toBeDefined();
  });

  it('export HandlerBuilder', () => {
    expect(core.HandlerBuilder).toBeDefined();
  });

  it('export SwitchHandlerBuilder', () => {
    expect(core.SwitchHandlerBuilder).toBeDefined();
  });

  it('export FBGraphAPIClient', () => {
    expect(core.FBGraphAPIClient).toBeDefined();
  });

  it('export LINEBotAPIClient', () => {
    expect(core.LINEBotAPIClient).toBeDefined();
  });

  it('export serveWebviews', () => {
    expect(core.serveWebviews).toBeDefined();
  });

  it('export verifyMessengerWebhook', () => {
    expect(core.verifyMessengerWebhook).toBeDefined();
  });

  it('export helpers', () => {
    expect(core.toAbsolutePath).toBeDefined();
    expect(core.getProjectPath).toBeDefined();
    expect(core.getProjectConfig).toBeDefined();
  });

  it('export payload', () => {
    expect(core.payload.GET_STARTED).toBeDefined();
    expect(core.payload.STILL_ALIVE).toBeDefined();
  });
});
