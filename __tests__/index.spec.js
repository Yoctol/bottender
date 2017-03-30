import * as core from '../index';

describe('core', () => {
  it('export MessengerBot', () => {
    expect(core.MessengerBot).toBeDefined();
  });

  it('export LineBot', () => {
    expect(core.LineBot).toBeDefined();
  });

  it('export HandlerBuilder', () => {
    expect(core.HandlerBuilder).toBeDefined();
  });

  it('export CompositeHandlerBuilder', () => {
    expect(core.CompositeHandlerBuilder).toBeDefined();
  });

  it('export FBGraphAPIClient', () => {
    expect(core.FBGraphAPIClient).toBeDefined();
  });

  it('export serveWebviews', () => {
    expect(core.serveWebviews).toBeDefined();
  });

  it('export verifyWebhook', () => {
    expect(core.verifyWebhook).toBeDefined();
  });

  it('export helpers', () => {
    expect(core.toAbsolutePath).toBeDefined();
    expect(core.getProjectPath).toBeDefined();
    expect(core.getProjectConfig).toBeDefined();
  });
});
