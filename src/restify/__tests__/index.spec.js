import { IncomingMessage } from 'http';

import * as restify from '../';

describe('restify', () => {
  afterEach(() => {
    // restify did some dirty things to IncomingMessage.prototype so we delete it
    // https://github.com/restify/node-restify/blob/1430644b53b08051066e8d1798a90a18527d541d/lib/request.js#L261-L273
    delete IncomingMessage.prototype.query;
  });

  it('export public apis', () => {
    expect(restify.createServer).toBeDefined();
    expect(restify.createMiddleware).toBeDefined();
    expect(restify.registerRoutes).toBeDefined();
    expect(restify.verifyLineSignature).toBeDefined();
    expect(restify.verifyMessengerSignature).toBeDefined();
    expect(restify.verifyMessengerWebhook).toBeDefined();
    expect(restify.verifySlackSignature).toBeDefined();
    expect(restify.verifySlackWebhook).toBeDefined();
    expect(restify.verifyViberSignature).toBeDefined();
  });
});
