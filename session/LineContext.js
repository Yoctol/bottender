/* @flow */

import wait from 'delay';

import LineBotAPIClient from '../graph/LineBotAPIClient';

import Context from './Context';
import DelayableJobQueue from './DelayableJobQueue';
import SessionData from './SessionData';

type MessageDelay = number | ((text: string) => number);

type Options = {
  client: LineBotAPIClient,
  data: SessionData,
  messageDelay: MessageDelay,
};

export default class LineContext extends Context {
  _client: LineBotAPIClient;
  _data: SessionData;
  _jobQueue: DelayableJobQueue;
  _messageDelay: MessageDelay;

  constructor({ lineAPIClient, data, messageDelay }: Options) {
    super({ data, messageDelay });
    this._client = lineAPIClient;
    this._jobQueue.beforeEach(({ delay }) => wait(delay));
  }

  sendText(text: string): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'pushText',
      args: [this._data.user.id, text],
      delay: this._getMessageDelay(text),
    });
  }
}
