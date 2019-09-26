import sh from '..';

jest.mock('../init');
jest.mock('../help');
jest.mock('../start');
jest.mock('../dev');

describe('sh cli', () => {
  it('should exist', () => {
    expect(sh).toBeDefined();
  });

  it('should return init module', () => {
    const init = require('../init').default;
    expect(sh.init).toEqual(init);
  });

  it('should return help module', () => {
    const help = require('../help').default;
    expect(sh.help).toEqual(help);
  });

  it('should return start module', () => {
    const start = require('../start').default;
    expect(sh.start).toEqual(start);
  });

  it('should return dev module', () => {
    const dev = require('../dev').default;
    expect(sh.dev).toEqual(dev);
  });
});
