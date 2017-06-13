import * as express from '../';

describe('express', () => {
  it('export public apis', () => {
    expect(express.createServer).toBeDefined();
    expect(express.createMiddleware).toBeDefined();
    expect(express.verifyMessengerWebhook).toBeDefined();
  });
});
