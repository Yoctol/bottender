import fs from 'fs';
import { EventEmitter } from 'events';

import invariant from 'invariant';
import sleep from 'delay';
import warning from 'warning';
import { JsonObject } from 'type-fest';
import { MessengerBatch, MessengerClient } from 'messaging-api-messenger';
import { MessengerBatchQueue } from 'messenger-batch';

import Context from '../context/Context';
import Session from '../session/Session';
import { RequestContext } from '../types';

import MessengerEvent from './MessengerEvent';
import * as MessengerTypes from './MessengerTypes';

export type MessengerContextOptions = {
  appId?: string;
  client: MessengerClient;
  event: MessengerEvent;
  session?: Session;
  initialState?: JsonObject;
  requestContext?: RequestContext;
  customAccessToken?: string;
  batchQueue?: MessengerBatchQueue | null;
  emitter?: EventEmitter;
};

class MessengerContext extends Context<MessengerClient, MessengerEvent> {
  _appId: string | null;

  _customAccessToken: string | null;

  _personaId: string | null = null;

  _batchQueue: MessengerBatchQueue | null;

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
  }: MessengerContextOptions) {
    super({ client, event, session, initialState, requestContext, emitter });
    this._customAccessToken = customAccessToken || null;
    this._batchQueue = batchQueue || null;
    this._appId = appId || null;
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): 'messenger' {
    return 'messenger';
  }

  get accessToken(): string | null {
    return this._customAccessToken || this._client.accessToken;
  }

  _getMethodOptions<O extends object>(
    options: O
  ): {
    accessToken?: string;
  } & O {
    return {
      ...(this._customAccessToken
        ? { accessToken: this._customAccessToken }
        : undefined),
      ...options,
    };
  }

  _getSenderActionMethodOptions<O extends object>(
    options: O
  ): {
    accessToken?: string;
    personaId?: string;
  } & O {
    return {
      ...(this._personaId ? { personaId: this._personaId } : undefined),
      ...this._getMethodOptions(options),
    };
  }

  _getSendMethodOptions<
    O extends {
      tag?: MessengerTypes.MessageTag;
    }
  >(
    options: O
  ): {
    accessToken?: string;
    personaId?: string;
    messagingType: MessengerTypes.MessagingType;
  } & O {
    const messagingType: MessengerTypes.MessagingType =
      options && options.tag ? 'MESSAGE_TAG' : 'RESPONSE';

    return {
      messagingType,
      ...(this._personaId ? { personaId: this._personaId } : undefined),
      ...this._getMethodOptions(options),
    };
  }

  /**
   * Inject persona for the context.
   *
   */
  usePersona(personaId: string): void {
    this._personaId = personaId;
  }

  /**
   * Inject access token for the context.
   *
   */
  useAccessToken(accessToken: string): void {
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
   * Send text to the owner of the session.
   *
   */
  async sendText(
    text: string,
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
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

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.sendText(
          this._session.user.id,
          text,
          this._getSendMethodOptions(options)
        )
      );
    }
    return this._client.sendText(
      this._session.user.id,
      text,
      this._getSendMethodOptions(options)
    );
  }

  async getUserProfile(
    options: {
      fields?: MessengerTypes.UserProfileField[];
    } = {}
  ): Promise<MessengerTypes.User | null> {
    if (!this._session) {
      warning(
        false,
        'getUserProfile: should not be called in context without session'
      );
      return null;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.getUserProfile(
          this._session.user.id,
          this._getMethodOptions(options)
        )
      );
    }
    return this._client.getUserProfile(
      this._session.user.id,
      this._getMethodOptions(options)
    );
  }

  async getUserPersistentMenu(
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.PersistentMenu | null> {
    if (!this._session) {
      warning(
        false,
        `getUserPersistentMenu: should not be called in context without session`
      );
      return null;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.getUserPersistentMenu(
          this._session.user.id,
          this._getMethodOptions(options)
        )
      );
    }

    return this._client.getUserPersistentMenu(
      this._session.user.id,
      this._getMethodOptions(options)
    );
  }

  async setUserPersistentMenu(
    attrs: MessengerTypes.PersistentMenu,
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.MutationSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        `setUserPersistentMenu: should not be called in context without session`
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.setUserPersistentMenu(
          this._session.user.id,
          attrs,
          this._getMethodOptions(options)
        )
      );
    }

    return this._client.setUserPersistentMenu(
      this._session.user.id,
      attrs,
      this._getMethodOptions(options)
    );
  }

  async deleteUserPersistentMenu(
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.MutationSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        `deleteUserPersistentMenu: should not be called in context without session`
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.deleteUserPersistentMenu(
          this._session.user.id,
          this._getMethodOptions(options)
        )
      );
    }

    return this._client.deleteUserPersistentMenu(
      this._session.user.id,
      this._getMethodOptions(options)
    );
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
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendSenderActionResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'sendSenderAction: should not be called in context without session'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.sendSenderAction(
          this._session.user.id,
          senderAction,
          this._getSenderActionMethodOptions(options)
        )
      );
    }
    return this._client.sendSenderAction(
      this._session.user.id,
      senderAction,
      this._getSenderActionMethodOptions(options)
    );
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#typingonuserid
   */
  async typingOn(
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendSenderActionResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'typingOn: should not be called in context without session'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.typingOn(
          this._session.user.id,
          this._getSenderActionMethodOptions(options)
        )
      );
    }
    return this._client.typingOn(
      this._session.user.id,
      this._getSenderActionMethodOptions(options)
    );
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#typingoffuserid
   */
  async typingOff(
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendSenderActionResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'typingOff: should not be called in context without session'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.typingOff(
          this._session.user.id,
          this._getSenderActionMethodOptions(options)
        )
      );
    }
    return this._client.typingOff(
      this._session.user.id,
      this._getSenderActionMethodOptions(options)
    );
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#markseenuserid
   */
  async markSeen(
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendSenderActionResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'markSeen: should not be called in context without session'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.markSeen(
          this._session.user.id,
          this._getSenderActionMethodOptions(options)
        )
      );
    }
    return this._client.markSeen(
      this._session.user.id,
      this._getSenderActionMethodOptions(options)
    );
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
  ): Promise<{ success: true } | undefined> {
    if (!this._session) {
      warning(
        false,
        'passThreadControl: should not be called in context without session'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.passThreadControl(
          this._session.user.id,
          targetAppId,
          metadata,
          this._getMethodOptions({})
        )
      );
    }
    return this._client.passThreadControl(
      this._session.user.id,
      targetAppId,
      metadata,
      this._getMethodOptions({})
    );
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#passthreadcontroltopageinboxuserid-metadata---official-docs
   */
  async passThreadControlToPageInbox(
    metadata?: string
  ): Promise<{ success: true } | undefined> {
    if (!this._session) {
      warning(
        false,
        'passThreadControlToPageInbox: should not be called in context without session'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.passThreadControlToPageInbox(
          this._session.user.id,
          metadata,
          this._getMethodOptions({})
        )
      );
    }
    return this._client.passThreadControlToPageInbox(
      this._session.user.id,
      metadata,
      this._getMethodOptions({})
    );
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#takethreadcontroluserid-metadata---official-docs
   */
  async takeThreadControl(
    metadata?: string
  ): Promise<{ success: true } | undefined> {
    if (!this._session) {
      warning(
        false,
        'takeThreadControl: should not be called in context without session'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.takeThreadControl(
          this._session.user.id,
          metadata,
          this._getMethodOptions({})
        )
      );
    }
    return this._client.takeThreadControl(
      this._session.user.id,
      metadata,
      this._getMethodOptions({})
    );
  }

  /**
   * https://github.com/Yoctol/messaging-apis/blob/master/packages/messaging-api-messenger/README.md#requestthreadcontroluserid-metadata---official-docs
   */
  async requestThreadControl(
    metadata?: string
  ): Promise<{ success: true } | undefined> {
    if (!this._session) {
      warning(
        false,
        'requestThreadControl: should not be called in context without session'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.requestThreadControl(
          this._session.user.id,
          metadata,
          this._getMethodOptions({})
        )
      );
    }
    return this._client.requestThreadControl(
      this._session.user.id,
      metadata,
      this._getMethodOptions({})
    );
  }

  /**
   * https://github.com/Yoctol/messaging-apis/blob/master/packages/messaging-api-messenger/README.md#requestthreadcontroluserid-metadata---official-docs
   */
  async getThreadOwner(): Promise<{ appId: string } | undefined> {
    if (!this._session) {
      warning(
        false,
        'getThreadOwner: should not be called in context without session'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.getThreadOwner(
          this._session.user.id,
          this._getMethodOptions({})
        )
      );
    }
    return this._client.getThreadOwner(
      this._session.user.id,
      this._getMethodOptions({})
    );
  }

  async isThreadOwner(): Promise<boolean> {
    invariant(
      this._appId,
      'isThreadOwner: must provide appId to use this feature'
    );
    const threadOwner = await this.getThreadOwner();

    if (!threadOwner) {
      return false;
    }

    const { appId } = threadOwner;

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
  async associateLabel(
    labelId: number
  ): Promise<{ success: true } | undefined> {
    if (!this._session) {
      warning(
        false,
        'associateLabel: should not be called in context without session'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.associateLabel(
          this._session.user.id,
          labelId,
          this._getMethodOptions({})
        )
      );
    }
    return this._client.associateLabel(
      this._session.user.id,
      labelId,
      this._getMethodOptions({})
    );
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#dissociatelabeluserid-labelid
   */
  async dissociateLabel(
    labelId: number
  ): Promise<{ success: true } | undefined> {
    if (!this._session) {
      warning(
        false,
        'dissociateLabel: should not be called in context without session'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.dissociateLabel(
          this._session.user.id,
          labelId,
          this._getMethodOptions({})
        )
      );
    }
    return this._client.dissociateLabel(
      this._session.user.id,
      labelId,
      this._getMethodOptions({})
    );
  }

  /**
   * https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#getassociatedlabelsuserid
   */
  async getAssociatedLabels(): Promise<
    | {
        data: {
          name: string;
          id: string;
        }[];
        paging: {
          cursors: {
            before: string;
            after: string;
          };
        };
      }
    | undefined
  > {
    if (!this._session) {
      warning(
        false,
        'getAssociatedLabels: should not be called in context without session'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.getAssociatedLabels(
          this._session.user.id,
          this._getMethodOptions({})
        )
      );
    }
    return this._client.getAssociatedLabels(
      this._session.user.id,
      this._getMethodOptions({})
    );
  }

  async sendMessage(
    message: MessengerTypes.Message,
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'sendMessage: should not be called in context without session'
      );
      return;
    }

    if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
      warning(
        false,
        `sendMessage: calling Send APIs in \`message_reads\`(event.isRead), \`message_deliveries\`(event.isDelivery) or \`message_echoes\`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.`
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.sendMessage(
          this._session.user.id,
          message,
          this._getSendMethodOptions(options)
        )
      );
    }
    return this._client.sendMessage(
      this._session.user.id,
      message,
      this._getSendMethodOptions(options)
    );
  }

  async sendAttachment(
    attachment: MessengerTypes.Attachment,
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'sendAttachment: should not be called in context without session'
      );
      return;
    }

    if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
      warning(
        false,
        'sendAttachment: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.sendAttachment(
          this._session.user.id,
          attachment,
          this._getSendMethodOptions(options)
        )
      );
    }
    return this._client.sendAttachment(
      this._session.user.id,
      attachment,
      this._getSendMethodOptions(options)
    );
  }

  async sendImage(
    image:
      | string
      | MessengerTypes.FileData
      | MessengerTypes.MediaAttachmentPayload,
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'sendImage: should not be called in context without session'
      );
      return;
    }

    if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
      warning(
        false,
        'sendImage: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
      );
      return;
    }

    if (
      this._batchQueue &&
      !Buffer.isBuffer(image) &&
      !(image instanceof fs.ReadStream)
    ) {
      return this._batchQueue.push(
        MessengerBatch.sendImage(
          this._session.user.id,
          image,
          this._getSendMethodOptions(options)
        )
      );
    }
    return this._client.sendImage(
      this._session.user.id,
      image,
      this._getSendMethodOptions(options)
    );
  }

  async sendAudio(
    audio:
      | string
      | MessengerTypes.FileData
      | MessengerTypes.MediaAttachmentPayload,
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'sendAudio: should not be called in context without session'
      );
      return;
    }

    if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
      warning(
        false,
        'sendAudio: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
      );
      return;
    }

    if (
      this._batchQueue &&
      !Buffer.isBuffer(audio) &&
      !(audio instanceof fs.ReadStream)
    ) {
      return this._batchQueue.push(
        MessengerBatch.sendAudio(
          this._session.user.id,
          audio,
          this._getSendMethodOptions(options)
        )
      );
    }
    return this._client.sendAudio(
      this._session.user.id,
      audio,
      this._getSendMethodOptions(options)
    );
  }

  async sendVideo(
    video:
      | string
      | MessengerTypes.FileData
      | MessengerTypes.MediaAttachmentPayload,
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'sendVideo: should not be called in context without session'
      );
      return;
    }

    if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
      warning(
        false,
        'sendVideo: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
      );
      return;
    }

    if (
      this._batchQueue &&
      !Buffer.isBuffer(video) &&
      !(video instanceof fs.ReadStream)
    ) {
      return this._batchQueue.push(
        MessengerBatch.sendVideo(
          this._session.user.id,
          video,
          this._getSendMethodOptions(options)
        )
      );
    }
    return this._client.sendVideo(
      this._session.user.id,
      video,
      this._getSendMethodOptions(options)
    );
  }

  async sendFile(
    file:
      | string
      | MessengerTypes.FileData
      | MessengerTypes.MediaAttachmentPayload,
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'sendFile: should not be called in context without session'
      );
      return;
    }

    if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
      warning(
        false,
        'sendFile: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
      );
      return;
    }

    if (
      this._batchQueue &&
      !Buffer.isBuffer(file) &&
      !(file instanceof fs.ReadStream)
    ) {
      return this._batchQueue.push(
        MessengerBatch.sendFile(
          this._session.user.id,
          file,
          this._getSendMethodOptions(options)
        )
      );
    }
    return this._client.sendFile(
      this._session.user.id,
      file,
      this._getSendMethodOptions(options)
    );
  }

  async sendTemplate(
    payload: MessengerTypes.TemplateAttachmentPayload,
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'sendTemplate: should not be called in context without session'
      );
      return;
    }

    if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
      warning(
        false,
        'sendTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.sendTemplate(
          this._session.user.id,
          payload,
          this._getSendMethodOptions(options)
        )
      );
    }
    return this._client.sendTemplate(
      this._session.user.id,
      payload,
      this._getSendMethodOptions(options)
    );
  }

  async sendGenericTemplate(
    elements: MessengerTypes.TemplateElement[],
    options: {
      imageAspectRatio?: 'horizontal' | 'square';
    } & MessengerTypes.SendOption
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'sendGenericTemplate: should not be called in context without session'
      );
      return;
    }

    if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
      warning(
        false,
        'sendGenericTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.sendGenericTemplate(
          this._session.user.id,
          elements,
          this._getSendMethodOptions(options)
        )
      );
    }
    return this._client.sendGenericTemplate(
      this._session.user.id,
      elements,
      this._getSendMethodOptions(options)
    );
  }

  async sendButtonTemplate(
    text: string,
    buttons: MessengerTypes.TemplateButton[],
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'sendButtonTemplate: should not be called in context without session'
      );
      return;
    }

    if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
      warning(
        false,
        'sendButtonTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.sendButtonTemplate(
          this._session.user.id,
          text,
          buttons,
          this._getSendMethodOptions(options)
        )
      );
    }
    return this._client.sendButtonTemplate(
      this._session.user.id,
      text,
      buttons,
      this._getSendMethodOptions(options)
    );
  }

  async sendMediaTemplate(
    elements: MessengerTypes.MediaElement[],
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'sendMediaTemplate: should not be called in context without session'
      );
      return;
    }

    if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
      warning(
        false,
        'sendMediaTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.sendMediaTemplate(
          this._session.user.id,
          elements,
          this._getSendMethodOptions(options)
        )
      );
    }
    return this._client.sendMediaTemplate(
      this._session.user.id,
      elements,
      this._getSendMethodOptions(options)
    );
  }

  async sendReceiptTemplate(
    attrs: MessengerTypes.ReceiptAttributes,
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'sendReceiptTemplate: should not be called in context without session'
      );
      return;
    }

    if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
      warning(
        false,
        'sendReceiptTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.sendReceiptTemplate(
          this._session.user.id,
          attrs,
          this._getSendMethodOptions(options)
        )
      );
    }
    return this._client.sendReceiptTemplate(
      this._session.user.id,
      attrs,
      this._getSendMethodOptions(options)
    );
  }

  async sendAirlineBoardingPassTemplate(
    attrs: MessengerTypes.AirlineBoardingPassAttributes,
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'sendAirlineBoardingPassTemplate: should not be called in context without session'
      );
      return;
    }

    if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
      warning(
        false,
        'sendAirlineBoardingPassTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.sendAirlineBoardingPassTemplate(
          this._session.user.id,
          attrs,
          this._getSendMethodOptions(options)
        )
      );
    }
    return this._client.sendAirlineBoardingPassTemplate(
      this._session.user.id,
      attrs,
      this._getSendMethodOptions(options)
    );
  }

  async sendAirlineCheckinTemplate(
    attrs: MessengerTypes.AirlineCheckinAttributes,
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'sendAirlineCheckinTemplate: should not be called in context without session'
      );
      return;
    }

    if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
      warning(
        false,
        'sendAirlineCheckinTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.sendAirlineCheckinTemplate(
          this._session.user.id,
          attrs,
          this._getSendMethodOptions(options)
        )
      );
    }
    return this._client.sendAirlineCheckinTemplate(
      this._session.user.id,
      attrs,
      this._getSendMethodOptions(options)
    );
  }

  async sendAirlineItineraryTemplate(
    attrs: MessengerTypes.AirlineItineraryAttributes,
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'sendAirlineItineraryTemplate: should not be called in context without session'
      );
      return;
    }

    if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
      warning(
        false,
        'sendAirlineItineraryTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.sendAirlineItineraryTemplate(
          this._session.user.id,
          attrs,
          this._getSendMethodOptions(options)
        )
      );
    }
    return this._client.sendAirlineItineraryTemplate(
      this._session.user.id,
      attrs,
      this._getSendMethodOptions(options)
    );
  }

  async sendAirlineUpdateTemplate(
    attrs: MessengerTypes.AirlineUpdateAttributes,
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'sendAirlineUpdateTemplate: should not be called in context without session'
      );
      return;
    }

    if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
      warning(
        false,
        'sendAirlineUpdateTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.sendAirlineUpdateTemplate(
          this._session.user.id,
          attrs,
          this._getSendMethodOptions(options)
        )
      );
    }
    return this._client.sendAirlineUpdateTemplate(
      this._session.user.id,
      attrs,
      this._getSendMethodOptions(options)
    );
  }

  async sendOneTimeNotifReqTemplate(
    attrs: MessengerTypes.OneTimeNotifReqAttributes,
    options: MessengerTypes.SendOption = {}
  ): Promise<MessengerTypes.SendMessageSuccessResponse | undefined> {
    if (!this._session) {
      warning(
        false,
        'sendOneTimeNotifReqTemplate: should not be called in context without session'
      );
      return;
    }

    if (this._event.isEcho || this._event.isDelivery || this._event.isRead) {
      warning(
        false,
        'sendOneTimeNotifReqTemplate: calling Send APIs in `message_reads`(event.isRead), `message_deliveries`(event.isDelivery) or `message_echoes`(event.isEcho) events may cause endless self-responding, so they are ignored by default.\nYou may like to turn off subscription of those events or handle them without Send APIs.'
      );
      return;
    }

    if (this._batchQueue) {
      return this._batchQueue.push(
        MessengerBatch.sendOneTimeNotifReqTemplate(
          this._session.user.id,
          attrs,
          this._getSendMethodOptions(options)
        )
      );
    }
    return this._client.sendOneTimeNotifReqTemplate(
      this._session.user.id,
      attrs,
      this._getSendMethodOptions(options)
    );
  }
}

export default MessengerContext;
