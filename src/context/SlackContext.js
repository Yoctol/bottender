/* @flow */

import sleep from 'delay';
import { SlackClient } from 'messaging-api-telegram';

import type { SlackSession } from '../bot/SlackConnector';

import { DEFAULT_MESSAGE_DELAY, type Context } from './Context';
import SlackEvent, { type SlackRawEvent } from './SlackEvent';
import DelayableJobQueue from './DelayableJobQueue';

type Options = {
  client: SlackClient,
  rawEvent: SlackRawEvent,
  session: SlackSession,
};

export default class SlackContext implements Context {
  _client: SlackClient;
  _event: SlackEvent;
  _session: SlackSession;
  _jobQueue: DelayableJobQueue;

  constructor({ client, rawEvent, session }: Options) {
    this._client = client;
    this._event = new SlackEvent(rawEvent);
    this._session = session;
    this._jobQueue = new DelayableJobQueue();
    this._jobQueue.beforeEach(({ delay }) => sleep(delay));

    const sendMethods = ['sendText', 'sendAttachment', 'sendAttachments'];

    sendMethods.forEach(method => {
      Object.defineProperty(this, `${method}`, {
        enumerable: false,
        configurable: true,
        writable: true,
        value(...args) {
          this._enqueue({
            instance: this._client,
            method,
            args: [...args],
            delay: DEFAULT_MESSAGE_DELAY,
            showIndicators: true,
          });
        },
      });

      Object.defineProperty(this, `${method}WithDelay`, {
        enumerable: false,
        configurable: true,
        writable: true,
        value(delay, ...rest) {
          this._enqueue({
            instance: this._client,
            method,
            args: [...rest],
            delay,
            showIndicators: true,
          });
        },
      });
    });
  }

  get platform(): string {
    return 'slack';
  }

  get event(): SlackEvent {
    return this._event;
  }

  get session(): SlackSession {
    return this._session;
  }

  _enqueue(job: Object): void {
    this._jobQueue.enqueue(job);
  }
}
