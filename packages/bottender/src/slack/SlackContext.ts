import { EventEmitter } from 'events';

import warning from 'warning';
import { JsonObject } from 'type-fest';
import { SlackOAuthClient, SlackTypes } from 'messaging-api-slack';

import Context from '../context/Context';
import Session from '../session/Session';
import { RequestContext } from '../types';

import SlackEvent, { Message, UIEvent } from './SlackEvent';

type Options = {
  client: SlackOAuthClient;
  event: SlackEvent;
  session?: Session | null;
  initialState?: JsonObject | null;
  requestContext?: RequestContext;
  emitter?: EventEmitter | null;
};

export default class SlackContext extends Context<
  SlackOAuthClient,
  SlackEvent
> {
  chat: {
    postMessage: (
      options: Omit<SlackTypes.PostMessageOptions, 'channel'>
    ) => Promise<any>;
    postEphemeral: (
      options: Omit<Omit<SlackTypes.PostEphemeralOptions, 'channel'>, 'user'>
    ) => Promise<any>;
    update: (options: SlackTypes.UpdateMessageOptions) => Promise<any>;
    delete: (
      options: Omit<SlackTypes.DeleteMessageOptions, 'channel'>
    ) => Promise<any>;
    meMessage: (
      options: Omit<SlackTypes.MeMessageOptions, 'channel'>
    ) => Promise<any>;
    getPermalink: (
      options: Omit<SlackTypes.GetPermalinkOptions, 'channel'>
    ) => Promise<any>;
    scheduleMessage: (
      options: Omit<SlackTypes.ScheduleMessageOptions, 'channel'>
    ) => Promise<any>;
    deleteScheduledMessage: (
      options: Omit<SlackTypes.DeleteScheduledMessageOptions, 'channel'>
    ) => Promise<any>;
    scheduledMessages: {
      list: (options: SlackTypes.GetScheduledMessagesOptions) => Promise<any>;
    };
  };

  views: {
    open: (options: SlackTypes.OpenViewOptions) => Promise<any>;
    publish: (options: SlackTypes.PublishViewOptions) => Promise<any>;
    push: (options: SlackTypes.PushViewOptions) => Promise<any>;
    update: (options: SlackTypes.UpdateViewOptions) => Promise<any>;
  };

  constructor({
    client,
    event,
    session,
    initialState,
    requestContext,
    emitter,
  }: Options) {
    super({ client, event, session, initialState, requestContext, emitter });

    this.chat = {
      postMessage: this._postMessage.bind(this),
      postEphemeral: this._postEphemeral.bind(this),
      update: this._updateMessage.bind(this),
      delete: this._deleteMessage.bind(this),
      meMessage: this._meMessage.bind(this),
      getPermalink: this._getPermalink.bind(this),
      scheduleMessage: this._scheduleMessage.bind(this),
      deleteScheduledMessage: this._deleteScheduledMessage.bind(this),
      scheduledMessages: {
        list: this._getScheduledMessages.bind(this),
      },
    };

    this.views = {
      open: this._openView.bind(this),
      publish: this._publishView.bind(this),
      push: this._pushView.bind(this),
      update: this._updateView.bind(this),
    };
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): 'slack' {
    return 'slack';
  }

  // FIXME: this is to fix type checking
  _getChannelIdFromSession(callerMethodName = ''): string | null {
    if (
      this._session &&
      typeof this._session.channel === 'object' &&
      this._session.channel &&
      this._session.channel.id &&
      typeof this._session.channel.id === 'string'
    ) {
      return this._session.channel.id;
    }

    if (callerMethodName) {
      warning(
        false,
        `${callerMethodName}: should not be called in context without session`
      );
    }

    return null;
  }

  /**
   * Sends a message to the channel of the session.
   *
   * https://api.slack.com/methods/chat.postMessage
   */
  postMessage(
    message:
      | {
          text?: string;
          attachments?: SlackTypes.Attachment[] | string;
          blocks?: SlackTypes.MessageBlock[] | string;
        }
      | string,
    options?: {}
  ): Promise<any> {
    warning(
      false,
      '`postMessage` is deprecated. Use `chat.postMessage` instead.'
    );

    return this.chat.postMessage({
      ...(typeof message === 'string' ? { text: message } : message),
      ...options,
    });
  }

  /**
   * Sends a message to a channel.
   *
   * https://api.slack.com/methods/chat.postMessage
   */
  _postMessage(
    options: Omit<SlackTypes.PostMessageOptions, 'channel'>
  ): Promise<any> {
    const channel = this._getChannelIdFromSession('chat.postMessage');

    if (!channel) {
      return Promise.resolve();
    }

    return this._client.chat.postMessage({
      threadTs: (this._event.rawEvent as Message).threadTs,
      channel,
      ...options,
    });
  }

  /**
   * Sends an ephemeral message to the session owner.
   *
   * https://api.slack.com/methods/chat.postMessage
   */
  postEphemeral(
    message:
      | {
          text?: string;
          attachments?: SlackTypes.Attachment[] | string;
          blocks?: SlackTypes.MessageBlock[] | string;
        }
      | string,
    options?: {}
  ): Promise<any> {
    warning(
      false,
      '`postEphemeral` is deprecated. Use `chat.postEphemeral` instead.'
    );

    return this.chat.postEphemeral({
      ...(typeof message === 'string' ? { text: message } : message),
      ...options,
    });
  }

  /**
   * Sends an ephemeral message to a user in a channel.
   *
   * https://api.slack.com/methods/chat.postEphemeral
   */
  _postEphemeral(
    options: Omit<Omit<SlackTypes.PostEphemeralOptions, 'channel'>, 'user'>
  ): Promise<any> {
    const channel = this._getChannelIdFromSession('chat.postEphemeral');

    if (!channel) {
      return Promise.resolve();
    }

    return this._client.chat.postEphemeral({
      channel,
      user: (this._session as any).user.id,
      ...options,
    });
  }

  /**
   * Send text to the owner of the session.
   *
   */
  sendText(text: string): Promise<any> {
    return this._postMessage({ text });
  }

  /**
   * Updates a message.
   *
   * https://api.slack.com/methods/chat.update
   */
  _updateMessage(options: SlackTypes.UpdateMessageOptions): Promise<any> {
    return this._client.chat.update(options);
  }

  /**
   * Deletes a message.
   *
   * https://api.slack.com/methods/chat.delete
   */
  _deleteMessage(
    options: Omit<SlackTypes.DeleteMessageOptions, 'channel'>
  ): Promise<any> {
    const channel = this._getChannelIdFromSession('chat.delete');

    if (!channel) {
      return Promise.resolve();
    }

    return this._client.chat.delete({
      channel,
      ...options,
    });
  }

  /**
   * Share a me message into a channel.
   *
   * https://api.slack.com/methods/chat.meMessage
   */
  _meMessage(
    options: Omit<SlackTypes.MeMessageOptions, 'channel'>
  ): Promise<any> {
    const channel = this._getChannelIdFromSession('chat.meMessage');

    if (!channel) {
      return Promise.resolve();
    }

    return this._client.chat.meMessage({ channel, ...options });
  }

  /**
   * Retrieve a permalink URL for a specific extant message
   *
   * https://api.slack.com/methods/chat.getPermalink
   */
  _getPermalink(
    options: Omit<SlackTypes.GetPermalinkOptions, 'channel'>
  ): Promise<any> {
    const channel = this._getChannelIdFromSession('chat.getPermalink');

    if (!channel) {
      return Promise.resolve();
    }

    return this._client.chat.getPermalink({ channel, ...options });
  }

  /**
   * Schedules a message to be sent to a channel.
   *
   * https://api.slack.com/methods/chat.scheduleMessage
   */
  _scheduleMessage(
    options: Omit<SlackTypes.ScheduleMessageOptions, 'channel'>
  ): Promise<any> {
    const channel = this._getChannelIdFromSession('chat.scheduleMessage');

    if (!channel) {
      return Promise.resolve();
    }

    return this._client.chat.scheduleMessage({
      channel,
      ...options,
    });
  }

  /**
   * Deletes a pending scheduled message from the queue.
   *
   * https://api.slack.com/methods/chat.deleteScheduledMessage
   */
  _deleteScheduledMessage(
    options: Omit<SlackTypes.DeleteScheduledMessageOptions, 'channel'>
  ): Promise<any> {
    const channel = this._getChannelIdFromSession(
      'chat.deleteScheduledMessage'
    );

    if (!channel) {
      return Promise.resolve();
    }

    return this._client.chat.deleteScheduledMessage({
      channel,
      ...options,
    });
  }

  /**
   * Returns a list of scheduled messages.
   *
   * https://api.slack.com/methods/chat.scheduledMessages.list
   */
  _getScheduledMessages(
    options: SlackTypes.GetScheduledMessagesOptions
  ): Promise<any> {
    return this._client.chat.scheduledMessages.list(options);
  }

  /**
   * Open a view for a user.
   *
   * https://api.slack.com/methods/views.open
   */
  _openView(options: SlackTypes.OpenViewOptions): Promise<any> {
    return this._client.views.open({
      ...options,
      view: {
        ...options.view,
        privateMetadata: JSON.stringify({
          original: options.view.privateMetadata,
          channelId: (this._event.rawEvent as UIEvent).channel.id,
        }),
      },
    });
  }

  /**
   * Publish a static view for a User.
   *
   * https://api.slack.com/methods/views.publish
   */
  _publishView(options: SlackTypes.PublishViewOptions): Promise<any> {
    return this._client.views.publish(options);
  }

  /**
   * Update an existing view.
   *
   * https://api.slack.com/methods/views.update
   */
  _updateView(options: SlackTypes.UpdateViewOptions): Promise<any> {
    return this._client.views.update(options);
  }

  /**
   * Push a view onto the stack of a root view.
   *
   * https://api.slack.com/methods/views.push
   */
  _pushView(options: SlackTypes.PushViewOptions): Promise<any> {
    return this._client.views.push(options);
  }
}
