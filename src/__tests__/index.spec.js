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

  it('export database api', () => {
    expect(core.resolveDatabase).toBeDefined();
    expect(core.resolveScopedDatabase).toBeDefined();
  });

  it('export api clients', () => {
    expect(core.FBGraphAPIClient).toBeDefined();
    expect(core.LINEBotAPIClient).toBeDefined();
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

  it('export intent', () => {
    expect(core.REGEX).toBeDefined();
    expect(core.recognizers).toBeDefined();
    expect(core.createRecognizer).toBeDefined();
    expect(core.IntentClassifier).toBeDefined();
  });
});
