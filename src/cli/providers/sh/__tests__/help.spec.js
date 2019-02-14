import help from '../help';

describe('help', () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it('shouild exist', () => {
    expect(help).toBeDefined();
  });

  it('should call console.log', () => {
    help();

    expect(console.log).toBeCalled();
  });
});
