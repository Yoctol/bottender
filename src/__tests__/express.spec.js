import * as express from '../express';

describe('express', () => {
  it('export verifyMessengerWebhook', () => {
    expect(express.verifyMessengerWebhook).toBeDefined();
  });
});
