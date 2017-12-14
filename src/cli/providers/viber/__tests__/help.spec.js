import help from '../help';

const consoleLog = console.log;

describe('help', () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = consoleLog;
  });

  it('shouild exist', () => {
    expect(help).toBeDefined();
  });

  it('should call console.log', () => {
    help();

    expect(console.log).toBeCalled();
  });
});
