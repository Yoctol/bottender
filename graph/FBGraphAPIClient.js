/* @flow */
import axios from 'axios';
import invariant from 'invariant';

type Axios = {
  get: Function,
  post: Function,
  put: Function,
  path: Function,
  delete: Function,
};

type AttachmentPayload = {
  url?: string,
};

type Attachment = {
  type: string,
  payload: AttachmentPayload,
};

type Message = {
  text?: ?string,
  attachment?: ?Attachment,
};

type TemplateButton = {
  type: string,
  title: string,
  url?: string,
  payload?: string,
};

type MenuItem = TemplateButton;

type TemplateElement = {
  title: string,
  image_url: string,
  subtitle: string,
  default_action: {
    type: string,
    url: string,
    messenger_extensions: boolean,
    webview_height_ratio: string,
    fallback_url: string,
  },
  buttons: Array<TemplateButton>,
};

type QuickReply = {
  content_type: string,
  title?: string,
  payload?: string,
  image_url: string,
};

type SenderAction = string;

type User = {
  first_name: string,
  last_name: string,
  profile_pic: string,
  locale: string,
  timezone: number,
  gender: string,
};

type MessengerProfileResponse = {
  data: Array<{
    get_started?: {
      payload: string,
    },
    persistent_menu?: Array<{
      locale: string,
      composer_input_disabled: boolean,
      call_to_actions: Array<TemplateButton>,
    }>,
    greeting?: Array<{
      locale: string,
      text: string,
    }>,
    whitelisted_domains?: Array<string>,
  }>,
};

type MutationSuccessResponse = {
  result: string,
};

type SendMessageSucessResponse = {
  recipient_id: string,
  message_id: string,
};

type SendSenderActionResponse = {
  recipient_id: string,
};

export default class FBGraphAPIClient {
  static factory: FBGraphAPIClient = (accessToken: string) =>
    new FBGraphAPIClient(accessToken);

  _accessToken: string;
  _http: Axios;

  constructor(accessToken: string) {
    this._accessToken = accessToken;
    this._http = axios.create({
      baseURL: 'https://graph.facebook.com/v2.8/',
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getHTTPClient: () => Axios = () => this._http;

  /**
   * Get User Profile
   *
   * https://www.quora.com/How-connect-Facebook-user-id-to-sender-id-in-the-Facebook-messenger-platform
   * first_name, last_name, profile_pic, locale, timezone, gender
   */
  getUser = (userId: string): Promise<User> =>
    this._http.get(`/${userId}?access_token=${this._accessToken}`);

  /**
   * Get Started Button
   *
   * https://developers.facebook.com/docs/messenger-platform/messenger-profile/get-started-button
   */
  getGetStartedButton = (): Promise<MessengerProfileResponse> =>
    this._http.get(
      `/me/messenger_profile?fields=get_started&access_token=${this._accessToken}`,
    );

  setGetStartedButton = (payload: string): Promise<MutationSuccessResponse> =>
    this._http.post(`/me/messenger_profile?access_token=${this._accessToken}`, {
      get_started: {
        payload,
      },
    });

  deleteGetStartedButton = (): Promise<MutationSuccessResponse> =>
    this._http.delete(
      `/me/messenger_profile?access_token=${this._accessToken}`,
      {
        data: {
          fields: ['get_started'],
        },
      },
    );

  /**
   * Persistent Menu
   *
   * https://developers.facebook.com/docs/messenger-platform/messenger-profile/persistent-menu
   * TODO: support locale?
   */
  getPersistentMenu = (): Promise<MessengerProfileResponse> =>
    this._http.get(
      `/me/messenger_profile?fields=persistent_menu&access_token=${this._accessToken}`,
    );

  setPersistentMenu = (
    menuItems: Array<MenuItem>,
    { inputDisabled = false }: { inputDisabled: boolean } = {},
  ): Promise<MutationSuccessResponse> =>
    this._http.post(`/me/messenger_profile?access_token=${this._accessToken}`, {
      persistent_menu: [
        {
          locale: 'default',
          composer_input_disabled: inputDisabled,
          call_to_actions: menuItems,
        },
      ],
    });

  deletePersistentMenu = (): Promise<MutationSuccessResponse> =>
    this._http.delete(
      `/me/messenger_profile?access_token=${this._accessToken}`,
      {
        data: {
          fields: ['persistent_menu'],
        },
      },
    );

  /**
   * Greeting Text
   *
   * https://developers.facebook.com/docs/messenger-platform/messenger-profile/greeting-text
   * TODO: support locale?
   */
  getGreetingText = (): Promise<MessengerProfileResponse> =>
    this._http.get(
      `/me/messenger_profile?fields=greeting&access_token=${this._accessToken}`,
    );

  setGreetingText = (text: string): Promise<MutationSuccessResponse> =>
    this._http.post(`/me/messenger_profile?access_token=${this._accessToken}`, {
      greeting: [
        {
          locale: 'default',
          text,
        },
      ],
    });

  deleteGreetingText = (): Promise<MutationSuccessResponse> =>
    this._http.delete(
      `/me/messenger_profile?access_token=${this._accessToken}`,
      {
        data: {
          fields: ['greeting'],
        },
      },
    );

  /**
   * Setting Domain Whitelist
   *
   * https://developers.facebook.com/docs/messenger-platform/messenger-profile/domain-whitelisting
   */
  getDomainWhitelist = (): Promise<MessengerProfileResponse> =>
    this._http.get(
      `/me/messenger_profile?fields=whitelisted_domains&access_token=${this._accessToken}`,
    );

  setDomainWhitelist = (domain: string): Promise<MutationSuccessResponse> =>
    this._http.post(`/me/messenger_profile?access_token=${this._accessToken}`, {
      whitelisted_domains: [domain],
    });

  deleteDomainWhitelist = (): Promise<MutationSuccessResponse> =>
    this._http.delete(
      `/me/messenger_profile?access_token=${this._accessToken}`,
      {
        data: {
          fields: ['whitelisted_domains'],
        },
      },
    );

  /**
   * Send API
   *
   * https://developers.facebook.com/docs/messenger-platform/send-api-reference
   */
  send = (
    recipientId: string,
    message: Message,
  ): Promise<SendMessageSucessResponse> =>
    this._http.post(`/me/messages?access_token=${this._accessToken}`, {
      recipient: {
        id: recipientId,
      },
      message,
    });

  /**
   * Content Types
   *
   * https://developers.facebook.com/docs/messenger-platform/send-api-reference/contenttypes
   */
  sendAttachment = (
    recipientId: string,
    attachment: Attachment,
  ): Promise<SendMessageSucessResponse> =>
    this.send(recipientId, { attachment });

  sendText = (
    recipientId: string,
    text: string,
  ): Promise<SendMessageSucessResponse> => this.send(recipientId, { text });

  // TODO: support formdata fileupload?
  // FIXME: prettier bug
  sendAudio = (
    recipientId: string,
    url: string,
  ): Promise<SendMessageSucessResponse> => this.sendAttachment(recipientId, {
    type: 'audio', // eslint-disable-line
    payload: {
      url,
    },
  });

  // TODO: support formdata fileupload?
  sendImage = (
    recipientId: string,
    url: string,
  ): Promise<SendMessageSucessResponse> => this.sendAttachment(recipientId, {
    type: 'image',
    payload: {
      url,
    },
  });

  // TODO: support formdata fileupload?
  sendVideo = (
    recipientId: string,
    url: string,
  ): Promise<SendMessageSucessResponse> => this.sendAttachment(recipientId, {
    type: 'video',
    payload: {
      url,
    },
  });

  // TODO: support formdata fileupload?
  sendFile = (
    recipientId: string,
    url: string,
  ): Promise<SendMessageSucessResponse> => this.sendAttachment(recipientId, {
    type: 'file',
    payload: {
      url,
    },
  });

  /**
   * Templates
   *
   * https://developers.facebook.com/docs/messenger-platform/send-api-reference/templates
   */
  sendTemplate = (
    recipientId: string,
    payload: AttachmentPayload,
  ): Promise<SendMessageSucessResponse> => this.sendAttachment(recipientId, {
    type: 'template',
    payload,
  });

  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/button-template
  sendButtonTemplate = (
    recipientId: string,
    text: string,
    buttons: Array<TemplateButton>,
  ): Promise<SendMessageSucessResponse> => this.sendTemplate(recipientId, {
    template_type: 'button',
    text,
    buttons,
  });

  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template
  sendGenericTemplate = (
    recipientId: string,
    elements: Array<TemplateElement>,
    ratio: string = 'square',
  ): Promise<SendMessageSucessResponse> => this.sendTemplate(recipientId, {
    template_type: 'generic',
    elements,
    image_aspect_ratio: ratio,
  });

  /**
   * Quick Replies
   *
   * https://developers.facebook.com/docs/messenger-platform/send-api-reference/quick-replies
   */
  sendQuickReplies = (
    recipientId: string,
    text: ?string,
    attachment: ?Attachment,
    quickReplies: Array<QuickReply>,
  ): Promise<SendMessageSucessResponse> => {
    // quick_replies is limited to 11
    invariant(
      Array.isArray(quickReplies) && quickReplies.length <= 11,
      'quickReplies is an array and limited to 11',
    );

    quickReplies.forEach(quickReply => {
      if (quickReplies.content_type === 'text') {
        // title has a 20 character limit, after that it gets truncated
        invariant(
          (quickReply.title: any).trim().length <= 20,
          'title of quickReply has a 20 character limit, after that it gets truncated',
        );

        // payload has a 1000 character limit
        invariant(
          (quickReply.payload: any).length <= 1000,
          'payload of quickReply has a 1000 character limit',
        );
      }
    });

    return this.send(recipientId, {
      text,
      attachment,
      quick_replies: quickReplies,
    });
  };

  /**
   * Typing
   *
   * https://developers.facebook.com/docs/messenger-platform/send-api-reference/sender-actions
   */
  sendSenderAction = (
    recipientId: string,
    action: SenderAction,
  ): Promise<SendSenderActionResponse> =>
    this._http.post(`/me/messages?access_token=${this._accessToken}`, {
      recipient: {
        id: recipientId,
      },
      sender_action: action,
    });

  turnTypingIndicatorsOn = (
    recipientId: string,
  ): Promise<SendSenderActionResponse> =>
    this.sendSenderAction(recipientId, 'typing_on');

  turnTypingIndicatorsOff = (
    recipientId: string,
  ): Promise<SendSenderActionResponse> =>
    this.sendSenderAction(recipientId, 'typing_off');
}
