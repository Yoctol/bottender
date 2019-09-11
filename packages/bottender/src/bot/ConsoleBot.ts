import readline from 'readline';

import { SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import ConsoleConnector from './ConsoleConnector';

export default class ConsoleBot extends Bot {
  constructor({
    sessionStore,
    fallbackMethods,
    mockPlatform,
  }: {
    sessionStore: SessionStore,
    fallbackMethods?: boolean,
    mockPlatform?: string,
  } = {}) {
    const connector = new ConsoleConnector({ fallbackMethods, mockPlatform });
    super({ connector, sessionStore, sync: true });
  }

  async getSession() {
    await this.initSessionStore();

    const { platform } = this._connector;
    const sessionKey = ((this._connector.getUniqueSessionKey(): any): string);

    // Create or retrieve session if possible
    const sessionId = `${platform}:${sessionKey}`;
    const session =
      (await this._sessions.read(sessionId)) || Object.create(null);

    return session;
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

      if (lowerCaseLine === '/session') {
        const session = await this.getSession();

        ((this._connector: any): ConsoleConnector).client.sendText(
          JSON.stringify(session, null, 2)
        );
      } else if (lowerCaseLine === '/state') {
        const session = await this.getSession();

        ((this._connector: any): ConsoleConnector).client.sendText(
          JSON.stringify(session._state || {}, null, 2)
        );
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
