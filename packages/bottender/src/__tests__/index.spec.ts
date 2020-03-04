import * as core from '..';

describe('core', () => {
  it('export bots', () => {
    expect(core.Bot).toBeDefined();
    expect(core.ConsoleBot).toBeDefined();
    expect(core.MessengerBot).toBeDefined();
    expect(core.WhatsappBot).toBeDefined();
    expect(core.LineBot).toBeDefined();
    expect(core.SlackBot).toBeDefined();
    expect(core.TelegramBot).toBeDefined();
    expect(core.ViberBot).toBeDefined();
  });

  it('export connectors', () => {
    expect(core.ConsoleConnector).toBeDefined();
    expect(core.MessengerConnector).toBeDefined();
    expect(core.WhatsappConnector).toBeDefined();
    expect(core.LineConnector).toBeDefined();
    expect(core.SlackConnector).toBeDefined();
    expect(core.TelegramConnector).toBeDefined();
    expect(core.ViberConnector).toBeDefined();
  });

  it('export cache implements', () => {
    expect(core.MemoryCacheStore).toBeDefined();
    expect(core.RedisCacheStore).toBeDefined();
  });

  it('export session stores', () => {
    expect(core.CacheBasedSessionStore).toBeDefined();
    expect(core.MemorySessionStore).toBeDefined();
    expect(core.RedisSessionStore).toBeDefined();
    expect(core.FileSessionStore).toBeDefined();
    expect(core.MongoSessionStore).toBeDefined();
  });

  it('export contexts', () => {
    expect(core.Context).toBeDefined();
    expect(core.ConsoleContext).toBeDefined();
    expect(core.MessengerContext).toBeDefined();
    expect(core.WhatsappContext).toBeDefined();
    expect(core.LineContext).toBeDefined();
    expect(core.SlackContext).toBeDefined();
    expect(core.TelegramContext).toBeDefined();
    expect(core.ViberContext).toBeDefined();
  });

  it('export extensions', () => {
    expect(core.withTyping).toBeDefined();
  });

  it('export createServer', () => {
    expect(core.createServer).toBeDefined();
  });

  it('export getSessionStore', () => {
    expect(core.getSessionStore).toBeDefined();
  });

  it('export getClient', () => {
    expect(core.getClient).toBeDefined();
  });

  it('export chain', () => {
    expect(core.chain).toBeDefined();
  });

  it('export withProps', () => {
    expect(core.withProps).toBeDefined();
  });
});
