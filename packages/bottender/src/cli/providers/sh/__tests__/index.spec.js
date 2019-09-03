import sh from '..';

jest.mock('../init');
jest.mock('../help');
jest.mock('../test');

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

  it('should return test module', () => {
    const test = require('../test').default;
    expect(sh.test).toEqual(test);
  });
});
