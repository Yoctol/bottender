/* @flow */

import wait from 'delay';

import FBGraphAPIClient from '../graph/FBGraphAPIClient';

import DelayableJobQueue from './DelayableJobQueue';
import SessionData from './SessionData';

const DEFAULT_MESSAGE_DELAY = 1000;

type MessageDelay = number | ((text: string) => number);

type Options = {
  graphAPIClient: FBGraphAPIClient,
  data: SessionData,
  messageDelay: MessageDelay,
};

export default class Session {
  _graphAPIClient: FBGraphAPIClient;
  _data: SessionData;
  _jobQueue: DelayableJobQueue;
  _messageDelay: MessageDelay;

  constructor({ graphAPIClient, data, messageDelay }: Options) {
    this._graphAPIClient = graphAPIClient;
    this._data = data;
    this._jobQueue = new DelayableJobQueue();
    this._jobQueue.beforeEach(async ({ delay }) => {
      await this.turnTypingIndicatorsOn();
      await wait(delay);
      await this.turnTypingIndicatorsOff();
    });
    this._messageDelay = messageDelay;
  }

  get data(): SessionData {
    return this._data;
  }

  set data(data: mixed): void {
    this._data = data;
  }

  sendText(text: string): void {
    this._jobQueue.enqueue({
      instance: this._graphAPIClient,
      method: 'sendText',
      args: [this._data.user.id, text],
      delay: this._getMessageDelay(text),
    });
  }

  sendImage(url: string): void {
    this._jobQueue.enqueue({
      instance: this._graphAPIClient,
      method: 'sendImage',
      args: [this._data.user.id, url],
      delay: this._getMessageDelay(),
    });
  }

  sendAudio(url: string): void {
    this._jobQueue.enqueue({
      instance: this._graphAPIClient,
      method: 'sendAudio',
      args: [this._data.user.id, url],
      delay: this._getMessageDelay(),
    });
  }

  sendVideo(url: string): void {
    this._jobQueue.enqueue({
      instance: this._graphAPIClient,
      method: 'sendVideo',
      args: [this._data.user.id, url],
      delay: this._getMessageDelay(),
    });
  }

  sendFile(url: string): void {
    this._jobQueue.enqueue({
      instance: this._graphAPIClient,
      method: 'sendFile',
      args: [this._data.user.id, url],
      delay: this._getMessageDelay(),
    });
  }

  sendQuickReplies(text: string, attachment, quickReplies): void {
    this._jobQueue.enqueue({
      instance: this._graphAPIClient,
      method: 'sendQuickReplies',
      args: [this._data.user.id, text, attachment, quickReplies],
      delay: this._getMessageDelay(),
    });
  }

  sendGenericTemplate(elements): void {
    this._jobQueue.enqueue({
      instance: this._graphAPIClient,
      method: 'sendGenericTemplate',
      args: [this._data.user.id, elements],
      delay: this._getMessageDelay(),
    });
  }

  sendButtonTemplate(text: string, buttons): void {
    this._jobQueue.enqueue({
      instance: this._graphAPIClient,
      method: 'sendButtonTemplate',
      args: [this._data.user.id, text, buttons],
      delay: this._getMessageDelay(),
    });
  }

  turnTypingIndicatorsOn(): void {
    this._graphAPIClient.turnTypingIndicatorsOn(this._data.user.id);
  }

  turnTypingIndicatorsOff(): void {
    this._graphAPIClient.turnTypingIndicatorsOff(this._data.user.id);
  }

  _getMessageDelay(message): number {
    if (typeof this._messageDelay === 'function') {
      return this._messageDelay(message);
    }
    return this._messageDelay || DEFAULT_MESSAGE_DELAY;
  }
}
