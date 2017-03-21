/* @flow */

import wait from 'delay';

import FBGraphAPIClient from '../graph/FBGraphAPIClient';

import type { MessageDelay } from './Context';
import Context from './Context';
import DelayableJobQueue from './DelayableJobQueue';
import SessionData from './SessionData';

type Options = {
  graphAPIClient: FBGraphAPIClient,
  data: SessionData,
  messageDelay: MessageDelay,
};

export default class MessengerContext extends Context {
  _client: FBGraphAPIClient;
  _data: SessionData;
  _jobQueue: DelayableJobQueue;
  _messageDelay: MessageDelay;

  constructor({ graphAPIClient, data, messageDelay }: Options) {
    super({ data, messageDelay });
    this._client = graphAPIClient;
    this._jobQueue.beforeEach(async ({ delay }) => {
      await this.turnTypingIndicatorsOn();
      await wait(delay);
      await this.turnTypingIndicatorsOff();
    });
  }

  sendText(text: string): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'sendText',
      args: [this._data.user.id, text],
      delay: this._getMessageDelay(text),
    });
  }

  sendImage(url: string): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'sendImage',
      args: [this._data.user.id, url],
      delay: this._getMessageDelay(),
    });
  }

  sendAudio(url: string): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'sendAudio',
      args: [this._data.user.id, url],
      delay: this._getMessageDelay(),
    });
  }

  sendVideo(url: string): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'sendVideo',
      args: [this._data.user.id, url],
      delay: this._getMessageDelay(),
    });
  }

  sendFile(url: string): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'sendFile',
      args: [this._data.user.id, url],
      delay: this._getMessageDelay(),
    });
  }

  sendQuickReplies(text: string, attachment: Object, quickReplies: []): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'sendQuickReplies',
      args: [this._data.user.id, text, attachment, quickReplies],
      delay: this._getMessageDelay(),
    });
  }

  sendGenericTemplate(elements: []): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'sendGenericTemplate',
      args: [this._data.user.id, elements],
      delay: this._getMessageDelay(),
    });
  }

  sendButtonTemplate(text: string, buttons: []): void {
    this._jobQueue.enqueue({
      instance: this._client,
      method: 'sendButtonTemplate',
      args: [this._data.user.id, text, buttons],
      delay: this._getMessageDelay(),
    });
  }

  turnTypingIndicatorsOn(): void {
    this._client.turnTypingIndicatorsOn(this._data.user.id);
  }

  turnTypingIndicatorsOff(): void {
    this._client.turnTypingIndicatorsOff(this._data.user.id);
  }
}
