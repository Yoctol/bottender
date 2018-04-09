/* @flow */

import sleep from 'delay';
import warning from 'warning';
import { MessengerClient, MessengerBatch } from 'messaging-api-messenger';

import type { Session } from '../session/Session';

import Context from './Context';
import MessengerEvent from './MessengerEvent';
import type { PlatformContext } from './PlatformContext';

type Options = {|
  client: MessengerClient,
  event: MessengerEvent,
  session: ?Session,
  initialState: ?Object,
  customAccessToken: ?string,
  batchQueue: ?Object,
|};

class MessengerContext extends Context implements PlatformContext {
  _client: MessengerClient;
  _event: MessengerEvent;
  _session: ?Session;
  _customAccessToken: ?string;
  _batchQueue: ?Object;

  constructor({
    client,
    event,
    session,
    initialState,
    customAccessToken,
    batchQueue,
  }: Options) {
    super({ client, event, session, initialState });
    this._customAccessToken = customAccessToken;
    this._batchQueue = batchQueue;
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'messenger';
  }

  get accessToken(): ?string {
    return this._customAccessToken || this._client.accessToken;
  }

  _callClientMethod(method: string, args: Array<any>) {
    if (this._batchQueue) {
      return this._batchQueue.push(MessengerBatch[method](...args));
    }
    return this._client[method](...args);
  }

  /**
   * Delay and show indicators for milliseconds.
   *
   */
  async typing(milliseconds: number): Promise<void> {
    if (milliseconds > 0) {
      await this.typingOn();
      await sleep(milliseconds);
      await this.typingOff();
    }
  }

  /**
   * Send text to the owner of then session.
   *
   */
  async sendText(text: string, options?: Object): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendText: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const messageType = options && options.tag ? 'MESSAGE_TAG' : 'RESPONSE';

    const args = [
      this._session.user.id,
      text,
      {
        messaging_type: messageType,
        ...options,
        access_token: this._customAccessToken,
      },
    ];

    return this._callClientMethod('sendText', args);
  }

  /**
   * Sender Actions
   *
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#sender-actions
   */

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#typingonuserid
   */
  async getUserProfile(): Promise<?Object> {
    if (!this._session) {
      warning(
        false,
        'getUserProfile: should not be called in context without session'
      );
      return null;
    }

    const args = [
      this._session.user.id,
      {
        access_token: this._customAccessToken,
      },
    ];

    return this._callClientMethod('getUserProfile', args);
  }

  /**
   * Sender Actions
   *
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#sender-actions
   */

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#sendsenderactionuserid-action
   */
  async sendSenderAction(action: string): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendSenderAction: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const args = [
      this._session.user.id,
      action,
      {
        access_token: this._customAccessToken,
      },
    ];

    return this._callClientMethod('sendSenderAction', args);
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#typingonuserid
   */
  async typingOn(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'typingOn: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const args = [
      this._session.user.id,
      {
        access_token: this._customAccessToken,
      },
    ];

    return this._callClientMethod('typingOn', args);
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#typingoffuserid
   */
  async typingOff(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'typingOff: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const args = [
      this._session.user.id,
      {
        access_token: this._customAccessToken,
      },
    ];

    return this._callClientMethod('typingOff', args);
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#markseenuserid
   */
  async markSeen(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'markSeen: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const args = [
      this._session.user.id,
      {
        access_token: this._customAccessToken,
      },
    ];

    return this._callClientMethod('markSeen', args);
  }

  /**
   * Handover Protocol
   *
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#handover-protocol-api
   */

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#passthreadcontroluserid-targetappid-metadata---official-docs
   */
  async passThreadControl(
    targetAppId: number,
    metadata?: string
  ): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'passThreadControl: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const args = [
      this._session.user.id,
      targetAppId,
      metadata,
      {
        access_token: this._customAccessToken,
      },
    ];

    return this._callClientMethod('passThreadControl', args);
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#passthreadcontroltopageinboxuserid-metadata---official-docs
   */
  async passThreadControlToPageInbox(metadata?: string): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'passThreadControlToPageInbox: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const args = [
      this._session.user.id,
      metadata,
      {
        access_token: this._customAccessToken,
      },
    ];

    return this._callClientMethod('passThreadControlToPageInbox', args);
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#takethreadcontroluserid-metadata---official-docs
   */
  async takeThreadControl(metadata?: string): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'takeThreadControl: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const args = [
      this._session.user.id,
      metadata,
      {
        access_token: this._customAccessToken,
      },
    ];

    return this._callClientMethod('takeThreadControl', args);
  }

  /**
   * https://github.com/Yoctol/messaging-apis/blob/master/packages/messaging-api-messenger/README.md#requestthreadcontroluserid-metadata---official-docs
   */
  async requestThreadControl(metadata?: string): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'requestThreadControl: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    const args = [
      this._session.user.id,
      metadata,
      {
        access_token: this._customAccessToken,
      },
    ];

    return this._callClientMethod('requestThreadControl', args);
  }

  /**
   * Targeting Broadcast Messages
   *
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#targeting-broadcast-messages---official-docs
   */

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#associatelabeluserid-labelid
   */
  async associateLabel(labelId: number): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'associateLabel: should not be called in context without session'
      );
      return;
    }

    const args = [
      this._session.user.id,
      labelId,
      {
        access_token: this._customAccessToken,
      },
    ];

    return this._callClientMethod('associateLabel', args);
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#dissociatelabeluserid-labelid
   */
  async dissociateLabel(labelId: number): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'dissociateLabel: should not be called in context without session'
      );
      return;
    }

    const args = [
      this._session.user.id,
      labelId,
      {
        access_token: this._customAccessToken,
      },
    ];

    return this._callClientMethod('dissociateLabel', args);
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#getassociatedlabelsuserid
   */
  async getAssociatedLabels(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'dissociateLabel: should not be called in context without session'
      );
      return;
    }

    const args = [
      this._session.user.id,
      {
        access_token: this._customAccessToken,
      },
    ];

    return this._callClientMethod('getAssociatedLabels', args);
  }
}

const sendMethods = [
  // type name, arguments length
  ['sendMessage', 3],
  ['sendAttachment', 3],
  ['sendImage', 3],
  ['sendAudio', 3],
  ['sendVideo', 3],
  ['sendFile', 3],
  ['sendTemplate', 3],
  ['sendGenericTemplate', 3],
  ['sendButtonTemplate', 4],
  ['sendListTemplate', 4],
  ['sendOpenGraphTemplate', 3],
  ['sendMediaTemplate', 3],
  ['sendReceiptTemplate', 3],
  ['sendAirlineBoardingPassTemplate', 3],
  ['sendAirlineCheckinTemplate', 3],
  ['sendAirlineItineraryTemplate', 3],
  ['sendAirlineUpdateTemplate', 3],

  // deprecated
  ['sendAirlineFlightUpdateTemplate', 3],
];

sendMethods.forEach(([method, len]) => {
  Object.defineProperty(MessengerContext.prototype, method, {
    enumerable: false,
    configurable: true,
    writable: true,
    async value(...args) {
      if (!this._session) {
        warning(
          false,
          `${method}: should not be called in context without session`
        );
        return;
      }

      this._isHandled = true;

      const options = args[len - 2];
      const messageType = options && options.tag ? 'MESSAGE_TAG' : 'RESPONSE';

      args[len - 2] = {
        messaging_type: messageType,
        ...options,
        access_token: this._customAccessToken,
      };

      return this._callClientMethod(method, [this._session.user.id, ...args]);
    },
  });
});

export default MessengerContext;
