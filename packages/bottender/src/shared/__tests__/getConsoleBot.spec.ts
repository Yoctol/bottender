import path from 'path';

import { mocked } from 'ts-jest/utils';

import ConsoleBot from '../../console/ConsoleBot';
import getBottenderConfig from '../getBottenderConfig';
import getConsoleBot from '../getConsoleBot';

jest.mock('../../shared/getBottenderConfig');
jest.mock(
  '/Users/username/bot/index.js',
  () =>
    async function App(context) {
      await context.sendText('Hello World');
    },
  { virtual: true }
);

const pathResolve = path.resolve;

beforeEach(() => {
  const customPathResolve = jest.fn((...args) => {
    if (args[0] === 'index.js') return '/Users/username/bot/index.js';
    return pathResolve(...args);
  });
  path.resolve = customPathResolve;
});

afterEach(() => {
  path.resolve = pathResolve;
});

it('be defined', () => {
  expect(getConsoleBot).toBeDefined();
});

it('should be instance of ConsoleBot', () => {
  mocked(getBottenderConfig).mockReturnValue({});
  expect(getConsoleBot()).toBeInstanceOf(ConsoleBot);
});
