/* eslint-disable global-require */

jest.mock('ngrok');

let ngrok;

function setup() {
  const handler = jest.fn();
  return {
    handler,
  };
}

let connectNgrok;

beforeEach(() => {
  ngrok = require('ngrok');
  ngrok.connect = jest.fn();
  connectNgrok = require('../connectNgrok').default;
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
