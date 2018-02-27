/* @flow */

import sleep from 'delay';
import warning from 'warning';
import { MessengerClient } from 'messaging-api-messenger';

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
|};

class MessengerContext extends Context implements PlatformContext {
  _client: MessengerClient;
  _event: MessengerEvent;
  _session: ?Session;
  _customAccessToken: ?string;

  constructor({
    client,
    event,
    session,
    initialState,
    customAccessToken,
  }: Options) {
    super({ client, event, session, initialState });
    this._customAccessToken = customAccessToken;
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

    return this._client.sendText(this._session.user.id, text, {
      messaging_type: messageType,
      ...options,
      access_token: this._customAccessToken,
    });
  }

  /**
   * Sender Actions
   *
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#sender-actions
   */

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

    return this._client.typingOn(this._session.user.id, {
      access_token: this._customAccessToken,
    });
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

    return this._client.typingOff(this._session.user.id, {
      access_token: this._customAccessToken,
    });
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

    return this._client.markSeen(this._session.user.id, {
      access_token: this._customAccessToken,
    });
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

    return this._client.passThreadControl(
      this._session.user.id,
      targetAppId,
      metadata,
      {
        access_token: this._customAccessToken,
      }
    );
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#passthreadcontroltopageinboxuserid-metadata---official-docs
   */
  async passThreadControlToPageInbox(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'passThreadControlToPageInbox: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    return this._client.passThreadControlToPageInbox(this._session.user.id, {
      access_token: this._customAccessToken,
    });
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#takethreadcontroluserid-metadata---official-docs
   */
  async takeThreadControl(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'takeThreadControl: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    return this._client.takeThreadControl(this._session.user.id, {
      access_token: this._customAccessToken,
    });
  }

  /**
   * https://github.com/Yoctol/messaging-apis/blob/master/packages/messaging-api-messenger/README.md#requestthreadcontroluserid-metadata---official-docs
   */
  async requestThreadControl(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'requestThreadControl: should not be called in context without session'
      );
      return;
    }

    this._isHandled = true;

    return this._client.requestThreadControl(this._session.user.id, {
      access_token: this._customAccessToken,
    });
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

    return this._client.associateLabel(this._session.user.id, labelId, {
      access_token: this._customAccessToken,
    });
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

    return this._client.dissociateLabel(this._session.user.id, labelId, {
      access_token: this._customAccessToken,
    });
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

    return this._client.getAssociatedLabels(this._session.user.id, {
      access_token: this._customAccessToken,
    });
  }
}

const sendMethods = [
  // method name, arguments length
  ['sendMessage', 3],
  ['sendAttachment', 3],
  ['sendImage', 3],
  ['sendAudio', 3],
  ['sendVideo', 3],
  ['sendFile', 3],
  ['sendQuickReplies', 4],
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
  ['sendAirlineFlightUpdateTemplate', 3],
];

sendMethods.forEach(([method, len]) => {
  Object.defineProperty(MessengerContext.prototype, `${method}`, {
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

      return this._client[method](this._session.user.id, ...args);
    },
  });
});

export default MessengerContext;
