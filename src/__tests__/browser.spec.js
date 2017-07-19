import * as core from '../browser';

describe('browser', () => {
  it('export bots', () => {
    expect(core.Bot).toBeDefined();
  });

  it('export connectors', () => {
    expect(core.Connector).toBeDefined();
  });

  it('export cache implements', () => {
    expect(core.MemoryCacheStore).toBeDefined();
  });

  it('export session stores', () => {
    expect(core.CacheBasedSessionStore).toBeDefined();
  });

  it('export handler builders', () => {
    expect(core.BasicHandlerBuilder).toBeDefined();
    expect(core.ClassifierHandlerBuilder).toBeDefined();
    expect(core.MiddlewareHandlerBuilder).toBeDefined();
  });
});
