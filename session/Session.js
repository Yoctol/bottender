/* @flow */

import wait from 'delay';

import DelayableJobQueue from './DelayableJobQueue';

const DEFAULT_MESSAGE_DELAY = 1000;

type MessageDelay = number | ((text: string) => number);

type Options = { messageDelay: MessageDelay };

export default class Session {
  _client: Object;
  _data: Object;
  _jobQueue: DelayableJobQueue;
  _messageDelay: MessageDelay;

  constructor({ client, data, messageDelay }: Options) {
    this._client = client;
    this._data = data;
    this._jobQueue = new DelayableJobQueue();
    this._jobQueue.beforeEach(async ({ delay }) => {
      await this.turnTypingIndicatorsOn();
      await wait(delay);
      await this.turnTypingIndicatorsOff();
    });
    this._messageDelay = messageDelay;
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
  }

  // deprecated
  get user() {
    return this.data.user;
  }
  // deprecated
  set user(user) {
    this.data.user = user;
  }

  sendText(text: string) {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'sendText',
      args: [this._data.user.id, text],
      delay: this._getMessageDelay(text),
    });
  }

  sendImage(url: string) {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'sendImage',
      args: [this._data.user.id, url],
      delay: this._getMessageDelay(),
    });
  }

  sendAudio(url: string) {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'sendAudio',
      args: [this._data.user.id, url],
      delay: this._getMessageDelay(),
    });
  }

  sendVideo(url: string) {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'sendVideo',
      args: [this._data.user.id, url],
      delay: this._getMessageDelay(),
    });
  }

  sendFile(url: string) {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'sendFile',
      args: [this._data.user.id, url],
      delay: this._getMessageDelay(),
    });
  }

  sendQuickReplies(text: string, attachment, quickReplies) {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'sendQuickReplies',
      args: [this._data.user.id, text, attachment, quickReplies],
      delay: this._getMessageDelay(),
    });
  }

  sendGenericTemplate(elements) {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'sendGenericTemplate',
      args: [this._data.user.id, elements],
      delay: this._getMessageDelay(),
    });
  }

  sendButtonTemplate(text, buttons) {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'sendButtonTemplate',
      args: [this._data.user.id, text, buttons],
      delay: this._getMessageDelay(),
    });
  }

  turnTypingIndicatorsOn() {
    this._client.turnTypingIndicatorsOn(this._data.user.id);
  }

  turnTypingIndicatorsOff() {
    this._client.turnTypingIndicatorsOff(this._data.user.id);
  }

  _getMessageDelay(message) {
    if (this._messageDelay === 'function') {
      return this._messageDelay(message);
    }
    return this._messageDelay || DEFAULT_MESSAGE_DELAY;
  }
}
