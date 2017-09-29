import * as micro from '../';

describe('micro', () => {
  it('export public apis', () => {
    expect(micro.createServer).toBeDefined();
    expect(micro.createRequestHandler).toBeDefined();
    expect(micro.verifyLineSignature).toBeDefined();
    expect(micro.verifyMessengerSignature).toBeDefined();
    expect(micro.verifyMessengerWebhook).toBeDefined();
    expect(micro.verifySlackWebhook).toBeDefined();
  });
});
