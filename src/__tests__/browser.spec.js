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
    expect(core.MemorySessionStore).toBeDefined();
  });

  it('export handler builders', () => {
    expect(core.middleware).toBeDefined();
    expect(core.Handler).toBeDefined();
    expect(core.ClassifierHandler).toBeDefined();
  });

  it('export contexts', () => {
    expect(core.Context).toBeDefined();
  });

  it('export extensions', () => {
    expect(core.withTyping).toBeDefined();
  });
});
