import * as koa from '../koa';

describe('koa', () => {
  it('export verifyMessengerWebhook', () => {
    expect(koa.verifyMessengerWebhook).toBeDefined();
  });
});
