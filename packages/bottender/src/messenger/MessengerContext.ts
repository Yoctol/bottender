import EventEmitter from 'events';

import invariant from 'invariant';
import sleep from 'delay';
import warning from 'warning';
import {
  MessengerBatch,
  MessengerClient,
  MessengerTypes,
} from 'messaging-api-messenger';

import Context from '../context/Context';
import Session from '../session/Session';
import { RequestContext } from '../types';

import MessengerEvent from './MessengerEvent';

type Options = {
  appId?: string;
  client: MessengerClient;
  event: MessengerEvent;
  session?: Session;
  initialState?: Record<string, any>;
  requestContext?: RequestContext;
  customAccessToken?: string;
  batchQueue?: Record<string, any> | null;
  emitter?: EventEmitter;
};

class MessengerContext extends Context<MessengerClient, MessengerEvent> {
  _appId: string | null;

  _customAccessToken: string | null;

  _personaId: string | null = null;

  _batchQueue: Record<string, any> | null;

  constructor({
    appId,
    client,
    event,
    session,
    initialState,
    requestContext,
    customAccessToken,
    batchQueue,
    emitter,
  }: Options) {
    super({ client, event, session, initialState, requestContext, emitter });
    this._customAccessToken = customAccessToken || null;
    this._batchQueue = batchQueue || null;
    this._appId = appId || null;
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'messenger';
  }

  get accessToken(): string | null {
    return this._customAccessToken || this._client.accessToken;
  }

  _callClientMethod(method: string, args: any[]) {
    if (this._batchQueue) {
      return (this._batchQueue as any).push(
        (MessengerBatch as any)[method](...args)
      );
    }
    return (this._client as any)[method](...args);
  }

  /**
   * Inject persona for the context.
   *
   */
  usePersona(personaId: string) {
    this._personaId = personaId;
  }

  /**
   * Inject access token for the context.
   *
   */
  useAccessToken(accessToken: string) {
    this._customAccessToken = accessToken;
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
  async sendText(text: string, options?: Record<string, any>): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendText: should not be called in context without session'
      );
      return;
    }

    if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
      warning(
        false,
        'sendText: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
      );
      return;
    }

    const messagingType =
      options && 'tag' in options ? 'MESSAGE_TAG' : 'RESPONSE';

    const args = [
      this._session.user.id,
      text,
      {
        messagingType,
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
        ...(this._personaId ? { personaId: this._personaId } : undefined),
        ...options,
      },
    ];

    return this._callClientMethod('sendText', args);
  }

  async getUserProfile(options: {
    fields?: MessengerTypes.UserProfileField[];
  }): Promise<MessengerTypes.User | null> {
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
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
        ...options,
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
  async sendSenderAction(
    senderAction: MessengerTypes.SenderAction,
    options?: Record<string, any>
  ): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendSenderAction: should not be called in context without session'
      );
      return;
    }

    const args = [
      this._session.user.id,
      senderAction,
      {
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
        ...(this._personaId ? { personaId: this._personaId } : undefined),
        ...options,
      },
    ];

    return this._callClientMethod('sendSenderAction', args);
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#typingonuserid
   */
  async typingOn(options?: Record<string, any>): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'typingOn: should not be called in context without session'
      );
      return;
    }

    const args = [
      this._session.user.id,
      {
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
        ...(this._personaId ? { personaId: this._personaId } : undefined),
        ...options,
      },
    ];

    return this._callClientMethod('typingOn', args);
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#typingoffuserid
   */
  async typingOff(options?: Record<string, any>): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'typingOff: should not be called in context without session'
      );
      return;
    }

    const args = [
      this._session.user.id,
      {
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
        ...(this._personaId ? { personaId: this._personaId } : undefined),
        ...options,
      },
    ];

    return this._callClientMethod('typingOff', args);
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#markseenuserid
   */
  async markSeen(options?: Record<string, any>): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'markSeen: should not be called in context without session'
      );
      return;
    }

    const args = [
      this._session.user.id,
      {
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
        ...(this._personaId ? { personaId: this._personaId } : undefined),
        ...options,
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

    const args = [
      this._session.user.id,
      targetAppId,
      metadata,
      {
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
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

    const args = [
      this._session.user.id,
      metadata,
      {
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
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

    const args = [
      this._session.user.id,
      metadata,
      {
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
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

    const args = [
      this._session.user.id,
      metadata,
      {
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
      },
    ];

    return this._callClientMethod('requestThreadControl', args);
  }

  /**
   * https://github.com/Yoctol/messaging-apis/blob/master/packages/messaging-api-messenger/README.md#requestthreadcontroluserid-metadata---official-docs
   */
  async getThreadOwner(): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'getThreadOwner: should not be called in context without session'
      );
      return;
    }

    const args = [
      this._session.user.id,
      {
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
      },
    ];

    return this._callClientMethod('getThreadOwner', args);
  }

  async isThreadOwner(): Promise<boolean> {
    invariant(
      this._appId,
      'isThreadOwner: must provide appId to use this feature'
    );
    const { appId } = await this.getThreadOwner();

    return `${appId}` === `${this._appId}`;
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
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
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
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
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
        'getAssociatedLabels: should not be called in context without session'
      );
      return;
    }

    const args = [
      this._session.user.id,
      {
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
      },
    ];

    return this._callClientMethod('getAssociatedLabels', args);
  }
}

const sendMethods: [string, number][] = [
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
  ['sendMediaTemplate', 3],
  ['sendReceiptTemplate', 3],
  ['sendAirlineBoardingPassTemplate', 3],
  ['sendAirlineCheckinTemplate', 3],
  ['sendAirlineItineraryTemplate', 3],
  ['sendAirlineUpdateTemplate', 3],
  ['sendOneTimeNotifReqTemplate', 3],
];

sendMethods.forEach(([method, arity]) => {
  Object.defineProperty(MessengerContext.prototype, method, {
    enumerable: false,
    configurable: true,
    writable: true,
    async value(...args: any[]) {
      if (!this._session) {
        warning(
          false,
          `${method}: should not be called in context without session`
        );
        return;
      }

      if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
        warning(
          false,
          `${method}: calling Send APIs in \`message_reads\`(event.isRead), \`message_deliveries\`(event.isDelivery) or \`message_echoes\`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.`
        );
        return;
      }

      const options = args[arity - 2];
      const messagingType = options && options.tag ? 'MESSAGE_TAG' : 'RESPONSE';

      args[arity - 2] = {
        messagingType,
        ...(this._customAccessToken
          ? { accessToken: this._customAccessToken }
          : undefined),
        ...(this._personaId ? { personaId: this._personaId } : undefined),
        ...options,
      };

      return this._callClientMethod(method, [this._session.user.id, ...args]);
    },
  });
});

export default MessengerContext;
