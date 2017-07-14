/* @flow */
import readline from 'readline';

import type { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import ConsoleConnector from './ConsoleConnector';

export default class ConsoleBot extends Bot {
  constructor({ sessionStore }: { sessionStore: SessionStore } = {}) {
    const connector = new ConsoleConnector();
    super({ connector, sessionStore });
  }

  createRuntime() {
    const requestHandler = this.createRequestHandler();
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    process.stdout.write('You > ');

    rl.on('line', async (line: string = '') => {
      if (line.toLowerCase() === '/quit') {
        rl.close();
        process.exit();
      }

      requestHandler({
        message: {
          text: line,
        },
      });
    });
  }
}
