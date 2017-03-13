import axios from 'axios';
import invariant from 'invariant';

export default class FBGraphAPIClient {
  static factory = accessToken => new FBGraphAPIClient(accessToken);

  constructor(accessToken) {
    this._accessToken = accessToken;
    this._http = axios.create({
      baseURL: 'https://graph.facebook.com/v2.8/',
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getHTTPClient = () => this._http;

  /**
   * Get User Profile
   *
   * https://www.quora.com/How-connect-Facebook-user-id-to-sender-id-in-the-Facebook-messenger-platform
   * first_name, last_name, profile_pic, locale, timezone, gender
   */
  getUser = userId =>
    this._http.get(`/${userId}?access_token=${this._accessToken}`);

  /**
   * Get Started Button
   *
   * https://developers.facebook.com/docs/messenger-platform/messenger-profile/get-started-button
   */
  getGetStartedButton = () =>
    this._http.get(
      `/me/messenger_profile?fields=get_started&access_token=${this._accessToken}`,
    );

  setGetStartedButton = payload =>
    this._http.post(`/me/messenger_profile?access_token=${this._accessToken}`, {
      get_started: {
        payload,
      },
    });

  deleteGetStartedButton = () =>
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
  getPersistentMenu = () =>
    this._http.get(
      `/me/messenger_profile?fields=persistent_menu&access_token=${this._accessToken}`,
    );

  setPersistentMenu = (menuItems, { inputDisabled = false } = {}) =>
    this._http.post(`/me/messenger_profile?access_token=${this._accessToken}`, {
      persistent_menu: [
        {
          locale: 'default',
          composer_input_disabled: inputDisabled,
          call_to_actions: menuItems,
        },
      ],
    });

  deletePersistentMenu = () =>
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
  getGreetingText = () =>
    this._http.get(
      `/me/messenger_profile?fields=greeting&access_token=${this._accessToken}`,
    );

  setGreetingText = text =>
    this._http.post(`/me/messenger_profile?access_token=${this._accessToken}`, {
      greeting: [
        {
          locale: 'default',
          text,
        },
      ],
    });

  deleteGreetingText = () =>
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
  getDomainWhitelist = () =>
    this._http.get(
      `/me/messenger_profile?fields=whitelisted_domains&access_token=${this._accessToken}`,
    );

  setDomainWhitelist = domain =>
    this._http.post(`/me/messenger_profile?access_token=${this._accessToken}`, {
      whitelisted_domains: [domain],
    });

  deleteDomainWhitelist = () =>
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
  send = (recipientId, message) =>
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
  sendAttachment = (recipientId, attachment) =>
    this.send(recipientId, { attachment });

  sendText = (recipientId, text) => this.send(recipientId, { text });

  // TODO: support formdata fileupload?
  sendAudio = (recipientId, url) => this.sendAttachment(recipientId, {
    type: 'audio',
    payload: {
      url,
    },
  });

  // TODO: support formdata fileupload?
  sendImage = (recipientId, url) => this.sendAttachment(recipientId, {
    type: 'image',
    payload: {
      url,
    },
  });

  // TODO: support formdata fileupload?
  sendVideo = (recipientId, url) => this.sendAttachment(recipientId, {
    type: 'video',
    payload: {
      url,
    },
  });

  // TODO: support formdata fileupload?
  sendFile = (recipientId, url) => this.sendAttachment(recipientId, {
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
  sendTemplate = (recipientId, payload) => this.sendAttachment(recipientId, {
    type: 'template',
    payload,
  });

  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/button-template
  sendButtonTemplate = (recipientId, text, buttons) =>
    this.sendTemplate(recipientId, {
      template_type: 'button',
      text,
      buttons,
    });

  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template
  sendGenericTemplate = (recipientId, elements, ratio = 'square') =>
    this.sendTemplate(recipientId, {
      template_type: 'generic',
      elements,
      image_aspect_ratio: ratio,
    });

  /**
   * Quick Replies
   *
   * https://developers.facebook.com/docs/messenger-platform/send-api-reference/quick-replies
   */
  sendQuickReplies = (recipientId, text, attachment, quickReplies) => {
    // quick_replies is limited to 11
    invariant(
      Array.isArray(quickReplies) && quickReplies.length <= 11,
      'quickReplies is an array and limited to 11',
    );

    quickReplies.forEach(quickReply => {
      if (quickReplies.content_type !== 'location') {
        // title has a 20 character limit, after that it gets truncated
        invariant(
          quickReply.title.trim().length <= 20,
          'title of quickReply has a 20 character limit, after that it gets truncated',
        );

        // payload has a 1000 character limit
        invariant(
          quickReply.payload.length <= 1000,
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
  setSenderAction = (recipientId, action) =>
    this._http.post(`/me/messages?access_token=${this._accessToken}`, {
      recipient: {
        id: recipientId,
      },
      sender_action: action,
    });

  turnTypingIndicatorsOn = recipientId =>
    this.setSenderAction(recipientId, 'typing_on');

  turnTypingIndicatorsOff = recipientId =>
    this.setSenderAction(recipientId, 'typing_off');
}
