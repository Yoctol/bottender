/* @flow */

import wait from 'delay';

import FBGraphAPIClient from '../api/FBGraphAPIClient';

import Context, { type MessageDelay } from './Context';
import MessengerEvent, { type RawMessengerEvent } from './MessengerEvent';
import DelayableJobQueue from './DelayableJobQueue';
import SessionData from './SessionData';

type Options = {
  graphAPIClient: FBGraphAPIClient,
  rawEvent: RawMessengerEvent,
  data: SessionData,
  messageDelay: MessageDelay,
};

export default class MessengerContext extends Context {
  _client: FBGraphAPIClient;
  _event: MessengerEvent;
  _data: SessionData;
  _jobQueue: DelayableJobQueue;
  _messageDelay: MessageDelay;

  constructor({ graphAPIClient, rawEvent, data, messageDelay }: Options) {
    super({ data, messageDelay });
    this._client = graphAPIClient;
    this._event = new MessengerEvent(rawEvent);
    this._jobQueue.beforeEach(async ({ delay, showIndicators = true }) => {
      if (showIndicators) {
        await this.turnTypingIndicatorsOn();
      }
      await wait(delay);
      if (showIndicators) {
        await this.turnTypingIndicatorsOff();
      }
    });

    const sendMethods = [
      'sendText',
      'sendImage',
      'sendAudio',
      'sendVideo',
      'sendFile',
      'sendQuickReplies',
      'sendGenericTemplate',
      'sendButtonTemplate',
      'sendListTemplate',
      'sendReceiptTemplate',
      'sendAirlineBoardingPassTemplate',
      'sendAirlineCheckinTemplate',
      'sendAirlineItineraryTemplate',
      'sendAirlineFlightUpdateTemplate',
    ];

    sendMethods.forEach(method => {
      Object.defineProperty(this, `${method}`, {
        enumerable: false,
        configurable: true,
        writable: true,
        value(...args) {
          this._enqueue({
            instance: this._client,
            method,
            args: [this._data.user.id, ...args],
            delay: this._getMessageDelay(),
            showIndicators: true,
          });
        },
      });

      Object.defineProperty(this, `${method}To`, {
        enumerable: false,
        configurable: true,
        writable: true,
        value(id, ...rest) {
          this._enqueue({
            instance: this._client,
            method,
            args: [id, ...rest],
            delay: 0,
            showIndicators: false,
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
            args: [this._data.user.id, ...rest],
            delay,
            showIndicators: true,
          });
        },
      });
    });
  }

  get event(): MessengerEvent {
    return this._event;
  }

  turnTypingIndicatorsOn(): void {
    this._client.turnTypingIndicatorsOn(this._data.user.id);
  }

  turnTypingIndicatorsOff(): void {
    this._client.turnTypingIndicatorsOff(this._data.user.id);
  }
}
