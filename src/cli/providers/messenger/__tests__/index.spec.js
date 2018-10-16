import messenger from '..';

jest.mock('../attachment');
jest.mock('../get-started');
jest.mock('../greeting');
jest.mock('../persistent-menu');
jest.mock('../profile');
jest.mock('../webhook');
jest.mock('../whitelisted-domains');
jest.mock('../help');
jest.mock('../persona');

describe('messenger cli', () => {
  it('should exist', () => {
    expect(messenger).toBeDefined();
  });

  it('should return attachment module', () => {
    const attachment = require('../attachment').default;
    expect(messenger.attachment).toEqual(attachment);
  });

  it('should return getStarted module', () => {
    const getStarted = require('../get-started').default;
    expect(messenger.getStarted).toEqual(getStarted);
  });

  it('should return greeting module', () => {
    const greeting = require('../greeting').default;
    expect(messenger.greeting).toEqual(greeting);
  });

  it('should return persistentMenu module', () => {
    const persistentMenu = require('../persistent-menu').default;
    expect(messenger.persistentMenu).toEqual(persistentMenu);
  });

  it('should return profile module', () => {
    const profile = require('../profile').default;
    expect(messenger.profile).toEqual(profile);
  });

  it('should return webhook module', () => {
    const webhook = require('../webhook').default;
    expect(messenger.webhook).toEqual(webhook);
  });

  it('should return whitelistedDomains module', () => {
    const whitelistedDomains = require('../whitelisted-domains').default;
    expect(messenger.whitelistedDomains).toEqual(whitelistedDomains);
  });

  it('should return help module', () => {
    const help = require('../help').default;
    expect(messenger.help).toEqual(help);
  });

  it('should return persistentMenu module when gettig menu', () => {
    const persistentMenu = require('../persistent-menu').default;
    expect(messenger.menu).toEqual(persistentMenu);
  });

  it('should return whitelistedDomains module when gettig domains', () => {
    const whitelistedDomains = require('../whitelisted-domains').default;
    expect(messenger.domains).toEqual(whitelistedDomains);
  });

  it('should return persona module', () => {
    const persona = require('../persona').default;
    expect(messenger.persona).toEqual(persona);
  });
});
