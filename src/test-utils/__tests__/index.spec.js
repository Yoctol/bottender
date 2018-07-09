import * as utils from '..';

describe('micro', () => {
  it('export public apis', () => {
    expect(utils.ContextSimulator).toBeDefined();
  });
});
