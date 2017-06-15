import * as restify from '../';

describe('restify', () => {
  it('export public apis', () => {
    expect(restify.createServer).toBeDefined();
    expect(restify.createMiddleware).toBeDefined();
    expect(restify.verifyMessengerWebhook).toBeDefined();
  });
});
