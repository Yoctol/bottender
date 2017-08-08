/* @flow */

import sleep from 'delay';
import { SlackOAuthClient } from 'messaging-api-slack';

import type { SlackSession } from '../bot/SlackConnector';

import { DEFAULT_MESSAGE_DELAY, type Context } from './Context';
import SlackEvent, { type SlackRawEvent } from './SlackEvent';
import DelayableJobQueue from './DelayableJobQueue';

type Options = {
  client: SlackOAuthClient,
  rawEvent: SlackRawEvent,
  session: SlackSession,
};

export default class SlackContext implements Context {
  _client: SlackOAuthClient;
  _event: SlackEvent;
  _session: SlackSession;
  _jobQueue: DelayableJobQueue;

  constructor({ client, rawEvent, session }: Options) {
    this._client = client;
    this._event = new SlackEvent(rawEvent);
    this._session = session;
    this._jobQueue = new DelayableJobQueue();
    this._jobQueue.beforeEach(({ delay }) => sleep(delay));
  }

  sendText = (text: string): void => {
    const channelId = this._getChannelIdFromSession();

    this._enqueue({
      instance: this._client,
      method: 'postMessage',
      args: [channelId, text, { as_user: true }],
      delay: DEFAULT_MESSAGE_DELAY,
      showIndicators: true,
    });
  };

  sendTextWithDelay = (delay: number, text: string): void => {
    const channelId = this._getChannelIdFromSession();

    this._enqueue({
      instance: this._client,
      method: 'postMessage',
      args: [channelId, text, { as_user: true }],
      delay,
      showIndicators: true,
    });
  };

  get event(): SlackEvent {
    return this._event;
  }

  get session(): SlackSession {
    return this._session;
  }

  _enqueue(job: Object): void {
    this._jobQueue.enqueue(job);
  }

  // FIXME: this is to fix type checking
  _getChannelIdFromSession(): string {
    if (
      typeof this._session.channel === 'object' &&
      this._session.channel &&
      this._session.channel.id &&
      typeof this._session.channel.id === 'string'
    ) {
      return this._session.channel.id;
    }
    return '';
  }
}
