import * as core from '../browser';

describe('browser', () => {
  it('export bots', () => {
    expect(core.Bot).toBeDefined();
  });

  it('export cache implements', () => {
    expect(core.MemoryCacheStore).toBeDefined();
  });

  it('export session stores', () => {
    expect(core.CacheBasedSessionStore).toBeDefined();
    expect(core.MemorySessionStore).toBeDefined();
  });

  it('export contexts', () => {
    expect(core.Context).toBeDefined();
  });

  it('export extensions', () => {
    expect(core.withTyping).toBeDefined();
  });

  it('export chain', () => {
    expect(core.chain).toBeDefined();
  });

  it('export withProps', () => {
    expect(core.withProps).toBeDefined();
  });
});
