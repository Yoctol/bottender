import * as core from '../index';

describe('core', () => {
  it('export bots', () => {
    expect(core.Bot).toBeDefined();
    expect(core.MessengerBot).toBeDefined();
    expect(core.LINEBot).toBeDefined();
  });

  it('export connectors', () => {
    expect(core.Connector).toBeDefined();
    expect(core.MessengerConnector).toBeDefined();
    expect(core.LINEConnector).toBeDefined();
  });

  it('export cache implements', () => {
    expect(core.MemoryCacheStore).toBeDefined();
    expect(core.RedisCacheStore).toBeDefined();
  });

  it('export session stores', () => {
    expect(core.CacheBasedSessionStore).toBeDefined();
    expect(core.FileSessionStore).toBeDefined();
    expect(core.MongoSessionStore).toBeDefined();
  });

  it('export handler builders', () => {
    expect(core.BasicHandlerBuilder).toBeDefined();
    expect(core.ClassifierHandlerBuilder).toBeDefined();
    expect(core.MiddlewareHandlerBuilder).toBeDefined();
    expect(core.MessengerHandlerBuilder).toBeDefined();
    expect(core.LINEHandlerBuilder).toBeDefined();
  });
});
