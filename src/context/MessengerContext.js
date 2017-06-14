/* @flow */

import wait from 'delay';
import { MessengerClient } from 'messaging-api-messenger';

import Session from '../session/Session';

import Context, { DEFAULT_MESSAGE_DELAY } from './Context';
import MessengerEvent, { type RawMessengerEvent } from './MessengerEvent';
import DelayableJobQueue from './DelayableJobQueue';

type Options = {
  graphAPIClient: MessengerClient,
  rawEvent: RawMessengerEvent,
  session: Session,
};

export default class MessengerContext extends Context {
  _client: MessengerClient;
  _event: MessengerEvent;
  _session: Session;
  _jobQueue: DelayableJobQueue;

  constructor({ graphAPIClient, rawEvent, session }: Options) {
    super({ session });
    this._client = graphAPIClient;
    this._event = new MessengerEvent(rawEvent);
    this._jobQueue.beforeEach(async ({ delay, showIndicators = true }) => {
      if (showIndicators) {
        this.turnTypingIndicatorsOn();
      }
      await wait(delay);
    });
    this._jobQueue.after(async ({ showIndicators = true }) => {
      if (showIndicators) {
        this.turnTypingIndicatorsOff();
      }
    });

    const sendMethods = [
      'sendText',
      'sendIssueResolutionText',
      'sendImage',
      'sendAudio',
      'sendVideo',
      'sendFile',
      'sendQuickReplies',
      'sendGenericTemplate',
      'sendShippingUpdateTemplate',
      'sendReservationUpdateTemplate',
      'sendIssueResolutionTemplate',
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
            args: [this._session.user.id, ...args],
            delay: DEFAULT_MESSAGE_DELAY,
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
            args: [this._session.user.id, ...rest],
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
    // $FlowExpectedError
    this._client.turnTypingIndicatorsOn(this._session.user.id);
  }

  turnTypingIndicatorsOff(): void {
    // $FlowExpectedError
    this._client.turnTypingIndicatorsOff(this._session.user.id);
  }
}
