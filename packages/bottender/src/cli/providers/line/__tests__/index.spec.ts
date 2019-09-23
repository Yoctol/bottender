import line from '..';

jest.mock('../menu');

describe('LINE cli', () => {
  it('should exist', () => {
    expect(line).toBeDefined();
  });
});
