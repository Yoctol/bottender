import readline from 'readline';

import Bot from '../bot/Bot';
import Session from '../session/Session';
import SessionStore from '../session/SessionStore';

import ConsoleConnector from './ConsoleConnector';
import ConsoleEvent, { ConsoleRawEvent } from './ConsoleEvent';
import { ConsoleClient } from './ConsoleClient';

import { ConsoleContext } from '..';

export default class ConsoleBot extends Bot<
  ConsoleRawEvent,
  ConsoleClient,
  ConsoleEvent,
  ConsoleContext
> {
  constructor({
    sessionStore,
    fallbackMethods,
    mockPlatform,
  }: {
    sessionStore?: SessionStore;
    fallbackMethods?: boolean;
    mockPlatform?: string;
  } = {}) {
    const connector = new ConsoleConnector({ fallbackMethods, mockPlatform });
    super({ connector, sessionStore, sync: true });
  }

  async getSession(): Promise<Session> {
    await this.initSessionStore();

    const { platform } = this._connector;
    const sessionKey = '1';

    // Create or retrieve session if possible
    const sessionId = `${platform}:${sessionKey}`;
    const session =
      (await this._sessions.read(sessionId)) ||
      (Object.create(null) as Session);

    return session;
  }

  createRuntime(): void {
    const requestHandler = this.createRequestHandler();
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const handleLine = async (line = ''): Promise<void> => {
      const lowerCaseLine = line.toLowerCase();
      if (lowerCaseLine === '/quit' || lowerCaseLine === '/exit') {
        rl.close();
        process.exit();
      }

      const client = this._connector.client as ConsoleClient;

      if (lowerCaseLine === '/session') {
        const session = await this.getSession();

        client.sendText(JSON.stringify(session, null, 2));
      } else if (lowerCaseLine === '/state') {
        const session = await this.getSession();

        client.sendText(JSON.stringify(session._state || {}, null, 2));
      } else {
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
      }

      process.stdout.write('You > ');
      rl.once('line', handleLine);
    };

    process.stdout.write('You > ');
    rl.once('line', handleLine);
  }
}
