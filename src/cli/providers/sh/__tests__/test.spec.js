import path from 'path';

import fs from 'fs-extra';

import loadModule from '../../../shared/loadModule';
import testCommand from '../test';

jest.mock('path');
jest.mock('fs-extra');
jest.mock('../../../shared/log');
jest.mock('../../../shared/loadModule');

const { error } = require('../../../shared/log');

beforeEach(() => {
  console.log = jest.fn();
  process.exit = jest.fn();
});

it('should print error message when cannot find handler', async () => {
  await testCommand({
    argv: {
      _: ['test', 'input.json'],
    },
  });

  expect(loadModule).toBeCalledWith('handler');
  expect(loadModule).toBeCalledWith('src/handler');

  expect(error).toBeCalledWith('cannot find handler');
  expect(process.exit).toBeCalledWith(1);
});

it('should run bot tests', async () => {
  path.resolve.mockImplementation(filename => `/Users/xxx/project/${filename}`);
  fs.readJson.mockResolvedValue(['hello', 'world']);
  loadModule.mockReturnValue(async context => {
    await context.sendText(`${context.event.text} +1`);
  });

  await testCommand({
    argv: {
      _: ['test', 'input.json'],
    },
  });

  expect(path.resolve).toBeCalledWith('input.json');
  expect(fs.readJson).toBeCalledWith('/Users/xxx/project/input.json');

  expect(console.log).toBeCalledWith(
    `[
  {
    "input": "hello",
    "output": {
      "calls": [
        {
          "name": "sendText",
          "args": [
            "hello +1"
          ]
        }
      ],
      "error": null
    }
  },
  {
    "input": "world",
    "output": {
      "calls": [
        {
          "name": "sendText",
          "args": [
            "world +1"
          ]
        }
      ],
      "error": null
    }
  }
]`
  );
});

it('should write to output file', async () => {
  path.resolve.mockImplementation(filename => `/Users/xxx/project/${filename}`);
  fs.readJson.mockResolvedValue(['hello', 'world']);
  loadModule.mockReturnValue(async context => {
    await context.sendText(`${context.event.text} +1`);
  });

  await testCommand({
    argv: {
      _: ['test', 'input.json'],
      o: 'output.json',
    },
  });

  expect(fs.writeJSON).toBeCalledWith('/Users/xxx/project/output.json', [
    {
      input: 'hello',
      output: {
        calls: [{ args: ['hello +1'], name: 'sendText' }],
        error: null,
      },
    },
    {
      input: 'world',
      output: {
        calls: [{ args: ['world +1'], name: 'sendText' }],
        error: null,
      },
    },
  ]);
});
