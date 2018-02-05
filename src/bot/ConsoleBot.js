/* @flow */
import readline from 'readline';

import type { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import ConsoleConnector from './ConsoleConnector';

export default class ConsoleBot extends Bot {
  constructor({
    sessionStore,
    fallbackMethods,
  }: { sessionStore: SessionStore, fallbackMethods?: boolean } = {}) {
    const connector = new ConsoleConnector({ fallbackMethods });
    super({ connector, sessionStore, sync: true });
  }

  createRuntime() {
    const requestHandler = this.createRequestHandler();
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const handleLine = async (line: string = '') => {
      if (line.toLowerCase() === '/quit') {
        rl.close();
        process.exit();
      }

      await Promise.resolve(
        requestHandler({
          message: {
            text: line,
          },
        })
      );

      process.stdout.write('You > ');
      rl.once('line', handleLine);
    };

    process.stdout.write('You > ');
    rl.once('line', handleLine);
  }
}
