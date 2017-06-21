/* eslint-disable global-require */
import connectNgrok from '../connectNgrok';

jest.mock('ngrok');

let ngrok;

function setup() {
  const handler = jest.fn();
  return {
    handler,
  };
}

beforeEach(() => {
  ngrok = require('ngrok');
  ngrok.connect = jest.fn();
});

it('be defined', () => {
  expect(connectNgrok).toBeDefined();
});

describe('#connect', () => {
  it('ngrok.connect first argument is a number', () => {
    const { handler } = setup();
    connectNgrok(123, handler);
    expect(ngrok.connect).toBeCalledWith(123, handler);
  });

  it('ngrok.connect first argument is NOT a number', () => {
    const { handler } = setup();
    connectNgrok('123', handler);
    expect(ngrok.connect).toBeCalledWith(handler);
  });
});
