import * as micro from '..';

describe('micro', () => {
  it('export public apis', () => {
    expect(micro.createServer).toBeDefined();
    expect(micro.createRequestHandler).toBeDefined();
  });
});
