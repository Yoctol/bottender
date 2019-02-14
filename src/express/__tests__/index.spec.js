import * as express from '..';

describe('express', () => {
  it('export public apis', () => {
    expect(express.createServer).toBeDefined();
    expect(express.createMiddleware).toBeDefined();
    expect(express.registerRoutes).toBeDefined();
    expect(express.verifyLineSignature).toBeDefined();
    expect(express.verifyLineWebhook).toBeDefined();
    expect(express.verifyMessengerSignature).toBeDefined();
    expect(express.verifyMessengerWebhook).toBeDefined();
    expect(express.verifySlackSignature).toBeDefined();
    expect(express.verifySlackWebhook).toBeDefined();
    expect(express.verifyViberSignature).toBeDefined();
  });
});
