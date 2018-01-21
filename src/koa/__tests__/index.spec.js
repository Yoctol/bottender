import * as koa from '../';

describe('koa', () => {
  it('export public apis', () => {
    expect(koa.createServer).toBeDefined();
    expect(koa.createMiddleware).toBeDefined();
    expect(koa.registerRoutes).toBeDefined();
    expect(koa.verifyLineSignature).toBeDefined();
    expect(koa.verifyMessengerSignature).toBeDefined();
    expect(koa.verifyMessengerWebhook).toBeDefined();
    expect(koa.verifySlackSignature).toBeDefined();
    expect(koa.verifySlackWebhook).toBeDefined();
    expect(koa.verifyViberSignature).toBeDefined();
  });
});
