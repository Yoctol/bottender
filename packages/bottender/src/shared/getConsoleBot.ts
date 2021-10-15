import path from 'path';

import { Action, Bot } from '@bottender/core';
import { ConsoleBot } from '@bottender/console';
import { merge } from 'lodash';

import { BottenderConfig } from '../types';

import getBottenderConfig from './getBottenderConfig';
import getSessionStore from './getSessionStore';

function getConsoleBot(): ConsoleBot {
  const bottenderConfig = getBottenderConfig();

  const { initialState } = merge(
    bottenderConfig /* , config */
  ) as BottenderConfig;

  const sessionStore = getSessionStore();

  // TODO: refine handler entry, improve error message and hint
  // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires
  const Entry: Action<any, any> = require(path.resolve('index.js'));
  let ErrorEntry: Action<any, any>;
  try {
    // eslint-disable-next-line import/no-dynamic-require
    ErrorEntry = require(path.resolve('_error.js'));
  } catch (err: any) {} // eslint-disable-line no-empty

  function initializeBot(bot: Bot<any, any, any, any>): void {
    if (initialState) {
      bot.setInitialState(initialState);
    }

    bot.onEvent(Entry);
    if (ErrorEntry) {
      bot.onError(ErrorEntry);
    }
  }

  const bot = new ConsoleBot({
    fallbackMethods: true,
    sessionStore,
  });

  initializeBot(bot);

  return bot;
}

export default getConsoleBot;
