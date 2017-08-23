/* @flow */

import sleep from 'delay';
import warning from 'warning';
import { SlackOAuthClient } from 'messaging-api-slack';

import type { SlackSession } from '../bot/SlackConnector';

import { DEFAULT_MESSAGE_DELAY, type Context } from './Context';
import SlackEvent from './SlackEvent';
import DelayableJobQueue from './DelayableJobQueue';

type Options = {
  client: SlackOAuthClient,
  event: SlackEvent,
  session: ?SlackSession,
};

export default class SlackContext implements Context {
  _client: SlackOAuthClient;
  _event: SlackEvent;
  _session: ?SlackSession;
  _jobQueue: DelayableJobQueue;

  constructor({ client, event, session }: Options) {
    this._client = client;
    this._event = event;
    this._session = session;
    this._jobQueue = new DelayableJobQueue();
    this._jobQueue.beforeEach(({ delay }) => sleep(delay));
  }

  postMessage(text: string): Promise<any> {
    const channelId = this._getChannelIdFromSession();

    if (!channelId) {
      warning(
        false,
        'postMessage: should not be called in context without session'
      );
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      this._enqueue({
        instance: this._client,
        method: 'postMessage',
        args: [channelId, text, { as_user: true }],
        delay: DEFAULT_MESSAGE_DELAY,
        showIndicators: true,
        onSuccess: resolve,
        onError: reject,
      });
    });
  }

  sendText(text: string): Promise<any> {
    return this.postMessage(text);
  }

  sendTextWithDelay(delay: number, text: string): Promise<any> {
    warning(false, `sendTextWithDelay is deprecated.`);

    const channelId = this._getChannelIdFromSession();

    if (!channelId) {
      warning(
        false,
        'sendTextWithDelay: should not be called in context without session'
      );
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      this._enqueue({
        instance: this._client,
        method: 'postMessage',
        args: [channelId, text, { as_user: true }],
        delay,
        showIndicators: true,
        onSuccess: resolve,
        onError: reject,
      });
    });
  }

  get platform(): string {
    return 'slack';
  }

  get event(): SlackEvent {
    return this._event;
  }

  get session(): ?SlackSession {
    return this._session;
  }

  _enqueue(job: Object): Promise<any> {
    return new Promise((resolve, reject) => {
      this._jobQueue.enqueue({
        ...job,
        onSuccess: resolve,
        onError: reject,
      });
    });
  }

  // FIXME: this is to fix type checking
  _getChannelIdFromSession(): ?string {
    if (!this._session) return null;
    if (
      typeof this._session.channel === 'object' &&
      this._session.channel &&
      this._session.channel.id &&
      typeof this._session.channel.id === 'string'
    ) {
      return this._session.channel.id;
    }
    return null;
  }
}
