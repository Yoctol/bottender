import path from 'path';

import fs from 'fs-extra';

import TestBot from '../../../bot/TestBot';
import { print, error } from '../../shared/log';
import loadModule from '../../shared/loadModule';

const test = async ({ argv }) => {
  const inputFile = argv._[1];
  const outputFile = argv['out-file'] || argv.o;

  const inputFilePath = path.resolve(inputFile);

  const tests = await fs.readJson(inputFilePath);

  const bot = new TestBot();

  // FIXME: how to find handler and initialState?
  // find from ./handler or ./src/handler
  const handler = loadModule('handler') || loadModule('src/handler');

  if (!handler) {
    error('cannot find handler');
    return process.exit(1);
  }

  bot.onEvent(handler);

  print('start running tests...');

  const result = await bot.runTests(tests);

  if (outputFile) {
    const outputFilePath = path.resolve(outputFile);

    await fs.writeJson(outputFilePath, result);
  } else {
    // TODO: how to prettify output
    console.log(JSON.stringify(result, null, 2));
  }
};

export default test;
