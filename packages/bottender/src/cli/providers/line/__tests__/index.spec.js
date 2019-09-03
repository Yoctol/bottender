import line from '..';

jest.mock('../menu');

describe('LINE cli', () => {
  it('should exist', () => {
    expect(line).toBeDefined();
  });

  it('should return menu module', () => {
    const menu = require('../menu').default;
    expect(line.menu).toEqual(menu);
  });
});
