import * as core from '../index';

describe('core', () => {
  it('export Bot', () => {
    expect(core.Bot).toBeDefined();
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

  it('export logMessage', () => {
    expect(core.logMessage).toBeDefined();
  });
});
