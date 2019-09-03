import providers from '..';

jest.mock('../sh');
jest.mock('../messenger');
jest.mock('../telegram');
jest.mock('../line');
jest.mock('../viber');

describe('providers', () => {
  it('should exist', () => {
    expect(providers).toBeDefined();
  });

  it('should return sh', () => {
    const sh = require('../sh').default;
    expect(providers.sh).toEqual(sh);
  });

  it('should return messenger', () => {
    const messenger = require('../messenger').default;
    expect(providers.messenger).toEqual(messenger);
  });

  it('should return telegram', () => {
    const telegram = require('../telegram').default;
    expect(providers.telegram).toEqual(telegram);
  });

  it('should return line', () => {
    const line = require('../line').default;
    expect(providers.line).toEqual(line);
  });

  it('should return viber', () => {
    const viber = require('../viber').default;
    expect(providers.viber).toEqual(viber);
  });
});
