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
      const lowerCaseLine = line.toLowerCase();
      if (lowerCaseLine === '/quit' || lowerCaseLine === '/exit') {
        rl.close();
        process.exit();
      }

      let rawEvent;

      if (/^\/payload /.test(line)) {
        const payload = line.split('/payload ')[1];

        rawEvent = {
          payload,
        };
      } else {
        rawEvent = {
          message: {
            text: line,
          },
        };
      }

      await Promise.resolve(requestHandler(rawEvent));

      process.stdout.write('You > ');
      rl.once('line', handleLine);
    };

    process.stdout.write('You > ');
    rl.once('line', handleLine);
  }
}
