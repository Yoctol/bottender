import * as koa from '../';

describe('koa', () => {
  it('export public apis', () => {
    expect(koa.createServer).toBeDefined();
    expect(koa.createMiddleware).toBeDefined();
    expect(koa.verifyLINESignature).toBeDefined();
    expect(koa.verifyMessengerWebhook).toBeDefined();
    expect(koa.verifySlackWebhook).toBeDefined();
  });
});
