/* @flow */
import axios from 'axios';
import invariant from 'invariant';

import type Axios from './types.flow';

type AttachmentPayload = {
  url?: string,
};

type Attachment = {
  type: string,
  payload: AttachmentPayload,
};

type TextOrAttachment = {
  text?: string,
  attachment?: Attachment,
};

type Message = {
  text?: ?string,
  attachment?: ?Attachment,
};

export type TemplateButton = {
  type: string,
  title: string,
  url?: string,
  payload?: string,
  webview_height_ratio?: 'compact' | 'tall' | 'full',
};

type MenuItem = TemplateButton;

export type TemplateElement = {
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

type Address = {
  street_1: string,
  street_2?: ?string,
  city: string,
  postal_code: string,
  state: string,
  country: string,
};

type Summary = {
  subtotal?: ?number,
  shipping_cost?: ?number,
  total_tax?: ?number,
  total_cost: number,
};

type Adjustment = {
  name?: ?string,
  ammont?: ?number,
};

type ReceiptAttributes = {
  recipient_name: string,
  merchant_name?: ?string,
  order_number: string, // must be unique
  currency: string,
  payment_method: string,
  timestamp?: ?string,
  order_url?: ?string,
  elements?: ?Array<TemplateElement>,
  address?: ?Address,
  summary: Summary,
  adjustments?: ?Array<Adjustment>,
};

type Airport = {
  airport_code: string,
  city: string,
  terminal?: string,
  gate?: string,
};

type FlightSchedule = {
  boarding_time?: string,
  departure_time: string,
  arrival_time?: string,
};

type FlightInfo = {
  flight_number: string,
  departure_airport: Airport,
  arrival_airport: Airport,
  flight_schedule: FlightSchedule,
};

type Field = {
  label: string,
  value: string,
};

type BoardingPass = {
  passenger_name: string,
  pnr_number: string,
  travel_class?: string,
  seat?: string,
  auxiliary_fields?: Array<Field>,
  secondary_fields?: Array<Field>,
  logo_image_url: string,
  header_image_url?: string,
  header_text_field?: Field,
  qr_code?: string, // FIXME: qr_code or barcode_image_url
  barcode_image_url?: string,
  above_bar_code_image_url: string,
  flight_info: FlightInfo,
};

type AirlineBoardingPassAttributes = {
  intro_message: string,
  locale: string,
  boarding_pass: Array<BoardingPass>,
};

type PassengerInfo = {
  passenger_id: string,
  ticket_number?: string,
  name: string,
};

type PassengerSegmentInfo = {
  segment_id: string,
  passenger_id: string,
  seat: string,
  seat_type: string,
  product_info?: string,
};

type PriceInfo = {
  title: string,
  ammont: number,
  currency?: string,
};

type AirlineCheckinAttributes = {
  intro_message: string,
  locale: string,
  theme_color?: string,
  pnr_number: string,
  passenger_info: Array<PassengerInfo>,
  flight_info: Array<FlightInfo>,
  passenger_segment_info: Array<PassengerSegmentInfo>,
  price_info?: Array<PriceInfo>,
  base_price?: number,
  tax?: number,
  total_price: number,
  currency: string,
};

type AirlineItineraryAttributes = {};

type AirlineFlightUpdateAttributes = {};

export type QuickReply = {
  content_type: 'text' | 'location',
  title?: string,
  payload?: string,
  image_url?: string,
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

type MessengerProfile = {
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
  account_linking_url?: string,
  payment_settings?: {
    privacy_url?: string,
    public_key?: string,
    test_users?: Array<string>,
  },
  target_audience?: {
    audience_type?: string,
    countries?: {
      whitelist: ?Array<string>,
      blacklist: ?Array<string>,
    },
  },
};

type MessengerProfileResponse = {
  data: Array<MessengerProfile>,
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
  static factory = (accessToken: string): FBGraphAPIClient =>
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
  getUserProfile = (userId: string): Promise<User> =>
    this._http.get(`/${userId}?access_token=${this._accessToken}`);

  /**
   * Messenger Profile
   *
   * https://developers.facebook.com/docs/messenger-platform/messenger-profile
   */
  getMessengerProfile = (
    fields: Array<string>
  ): Promise<MessengerProfileResponse> =>
    this._http.get(
      `/me/messenger_profile?fields=${fields.join(',')}&access_token=${this._accessToken}`
    );

  setMessengerProfile = (
    profile: MessengerProfile
  ): Promise<MutationSuccessResponse> =>
    this._http.post(
      `/me/messenger_profile?access_token=${this._accessToken}`,
      profile
    );

  deleteMessengerProfile = (
    fields: Array<string>
  ): Promise<MutationSuccessResponse> =>
    this._http.delete(
      `/me/messenger_profile?access_token=${this._accessToken}`,
      {
        data: {
          fields,
        },
      }
    );

  /**
   * Get Started Button
   *
   * https://developers.facebook.com/docs/messenger-platform/messenger-profile/get-started-button
   */
  getGetStartedButton = (): Promise<MessengerProfileResponse> =>
    this.getMessengerProfile(['get_started']);

  setGetStartedButton = (payload: string): Promise<MutationSuccessResponse> =>
    this.setMessengerProfile({
      get_started: {
        payload,
      },
    });

  deleteGetStartedButton = (): Promise<MutationSuccessResponse> =>
    this.deleteMessengerProfile(['get_started']);

  /**
   * Persistent Menu
   *
   * https://developers.facebook.com/docs/messenger-platform/messenger-profile/persistent-menu
   * TODO: support locale?
   */
  getPersistentMenu = (): Promise<MessengerProfileResponse> =>
    this.getMessengerProfile(['persistent_menu']);

  setPersistentMenu = (
    menuItems: Array<MenuItem>,
    { inputDisabled = false }: { inputDisabled: boolean } = {}
  ): Promise<MutationSuccessResponse> =>
    this.setMessengerProfile({
      persistent_menu: [
        {
          locale: 'default',
          composer_input_disabled: inputDisabled,
          call_to_actions: menuItems,
        },
      ],
    });

  deletePersistentMenu = (): Promise<MutationSuccessResponse> =>
    this.deleteMessengerProfile(['persistent_menu']);

  /**
   * Greeting Text
   *
   * https://developers.facebook.com/docs/messenger-platform/messenger-profile/greeting-text
   * TODO: support locale?
   */
  getGreetingText = (): Promise<MessengerProfileResponse> =>
    this.getMessengerProfile(['greeting']);

  setGreetingText = (text: string): Promise<MutationSuccessResponse> =>
    this.setMessengerProfile({
      greeting: [
        {
          locale: 'default',
          text,
        },
      ],
    });

  deleteGreetingText = (): Promise<MutationSuccessResponse> =>
    this.deleteMessengerProfile(['greeting']);

  /**
   * Domain Whitelist
   *
   * https://developers.facebook.com/docs/messenger-platform/messenger-profile/domain-whitelisting
   */
  getDomainWhitelist = (): Promise<MessengerProfileResponse> =>
    this.getMessengerProfile(['whitelisted_domains']);

  setDomainWhitelist = (domain: string): Promise<MutationSuccessResponse> =>
    this.setMessengerProfile({
      whitelisted_domains: [domain],
    });

  deleteDomainWhitelist = (): Promise<MutationSuccessResponse> =>
    this.deleteMessengerProfile(['whitelisted_domains']);

  /**
   * Account Linking URL
   *
   * https://developers.facebook.com/docs/messenger-platform/messenger-profile/account-linking-url
   */
  getAccountLinkingURL = (): Promise<MessengerProfileResponse> =>
    this.getMessengerProfile(['account_linking_url']);

  setAccountLinkingURL = (url: string): Promise<MutationSuccessResponse> =>
    this.setMessengerProfile({
      account_linking_url: url,
    });

  deleteAccountLinkingURL = (): Promise<MutationSuccessResponse> =>
    this.deleteMessengerProfile(['account_linking_url']);

  /**
   * Payment Settings
   *
   * https://developers.facebook.com/docs/messenger-platform/messenger-profile/payment-settings
   */
  getPaymentSettings = (): Promise<MessengerProfileResponse> =>
    this.getMessengerProfile(['payment_settings']);

  setPaymentPrivacyPolicyURL = (
    url: string
  ): Promise<MutationSuccessResponse> =>
    this.setMessengerProfile({
      payment_settings: {
        privacy_url: url,
      },
    });

  setPaymentPublicKey = (key: string): Promise<MutationSuccessResponse> =>
    this.setMessengerProfile({
      payment_settings: {
        public_key: key,
      },
    });

  setPaymentTestUsers = (
    users: Array<string>
  ): Promise<MutationSuccessResponse> =>
    this.setMessengerProfile({
      payment_settings: {
        test_users: users,
      },
    });

  deletePaymentSettings = (): Promise<MutationSuccessResponse> =>
    this.deleteMessengerProfile(['payment_settings']);

  /**
   * Target Audience
   *
   * https://developers.facebook.com/docs/messenger-platform/messenger-profile/target-audience
   */
  getTargetAudience = (): Promise<MessengerProfileResponse> =>
    this.getMessengerProfile(['target_audience']);

  setTargetAudience = (
    type: string,
    whitelist: ?Array<string> = [],
    blacklist: ?Array<string> = []
  ): Promise<MutationSuccessResponse> =>
    this.setMessengerProfile({
      target_audience: {
        audience_type: type,
        countries: {
          whitelist,
          blacklist,
        },
      },
    });

  deleteTargetAudience = (): Promise<MutationSuccessResponse> =>
    this.deleteMessengerProfile(['target_audience']);

  /**
   * Send API
   *
   * https://developers.facebook.com/docs/messenger-platform/send-api-reference
   */
  send = (
    recipientId: string,
    message: Message
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
    attachment: Attachment
  ): Promise<SendMessageSucessResponse> =>
    this.send(recipientId, { attachment });

  sendText = (
    recipientId: string,
    text: string
  ): Promise<SendMessageSucessResponse> => this.send(recipientId, { text });

  // TODO: support formdata fileupload?
  // FIXME: prettier bug?
  sendAudio = (
    recipientId: string,
    url: string
  ): Promise<SendMessageSucessResponse> =>
    this.sendAttachment(recipientId, {
      type: 'audio', // eslint-disable-line
      payload: {
        url,
      },
    });

  // TODO: support formdata fileupload?
  sendImage = (
    recipientId: string,
    url: string
  ): Promise<SendMessageSucessResponse> =>
    this.sendAttachment(recipientId, {
      type: 'image',
      payload: {
        url,
      },
    });

  // TODO: support formdata fileupload?
  sendVideo = (
    recipientId: string,
    url: string
  ): Promise<SendMessageSucessResponse> =>
    this.sendAttachment(recipientId, {
      type: 'video',
      payload: {
        url,
      },
    });

  // TODO: support formdata fileupload?
  sendFile = (
    recipientId: string,
    url: string
  ): Promise<SendMessageSucessResponse> =>
    this.sendAttachment(recipientId, {
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
    payload: AttachmentPayload
  ): Promise<SendMessageSucessResponse> =>
    this.sendAttachment(recipientId, {
      type: 'template',
      payload,
    });

  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/button-template
  sendButtonTemplate = (
    recipientId: string,
    text: string,
    buttons: Array<TemplateButton>
  ): Promise<SendMessageSucessResponse> =>
    this.sendTemplate(recipientId, {
      template_type: 'button',
      text,
      buttons,
    });

  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template
  sendGenericTemplate = (
    recipientId: string,
    elements: Array<TemplateElement>,
    ratio: string = 'horizontal'
  ): Promise<SendMessageSucessResponse> =>
    this.sendTemplate(recipientId, {
      template_type: 'generic',
      elements,
      image_aspect_ratio: ratio,
    });

  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/list-template
  sendListTemplate = (
    recipientId: string,
    elements: Array<TemplateElement>,
    buttons: Array<TemplateButton>,
    topElementStyle: string = 'large'
  ): Promise<SendMessageSucessResponse> =>
    this.sendTemplate(recipientId, {
      template_type: 'list',
      elements,
      buttons,
      top_element_style: topElementStyle,
    });

  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/receipt-template
  sendReceiptTemplate = (
    recipientId: string,
    attrs: ReceiptAttributes
  ): Promise<SendMessageSucessResponse> =>
    this.sendTemplate(recipientId, {
      template_type: 'receipt',
      ...attrs,
    });

  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-boardingpass-template
  sendAirlineBoardingPassTemplate = (
    recipientId: string,
    attrs: AirlineBoardingPassAttributes
  ): Promise<SendMessageSucessResponse> =>
    this.sendTemplate(recipientId, {
      template_type: 'airline_boardingpass',
      ...attrs,
    });

  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-checkin-template
  sendAirlineCheckinTemplate = (
    recipientId: string,
    attrs: AirlineCheckinAttributes
  ): Promise<SendMessageSucessResponse> =>
    this.sendTemplate(recipientId, {
      template_type: 'airline_checkin',
      ...attrs,
    });

  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-itinerary-template
  sendAirlineItineraryTemplate = (
    recipientId: string,
    attrs: AirlineItineraryAttributes
  ): Promise<SendMessageSucessResponse> =>
    this.sendTemplate(recipientId, {
      template_type: 'airline_itinerary',
      ...attrs,
    });

  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/airline-update-template
  sendAirlineFlightUpdateTemplate = (
    recipientId: string,
    attrs: AirlineFlightUpdateAttributes
  ): Promise<SendMessageSucessResponse> =>
    this.sendTemplate(recipientId, {
      template_type: 'airline_update',
      ...attrs,
    });

  /**
   * Quick Replies
   *
   * https://developers.facebook.com/docs/messenger-platform/send-api-reference/quick-replies
   */
  sendQuickReplies = (
    recipientId: string,
    textOrAttachment: TextOrAttachment,
    quickReplies: Array<QuickReply>
  ): Promise<SendMessageSucessResponse> => {
    // quick_replies is limited to 11
    invariant(
      Array.isArray(quickReplies) && quickReplies.length <= 11,
      'quickReplies is an array and limited to 11'
    );

    quickReplies.forEach(quickReply => {
      if (quickReplies.content_type === 'text') {
        // title has a 20 character limit, after that it gets truncated
        invariant(
          (quickReply.title: any).trim().length <= 20,
          'title of quickReply has a 20 character limit, after that it gets truncated'
        );

        // payload has a 1000 character limit
        invariant(
          (quickReply.payload: any).length <= 1000,
          'payload of quickReply has a 1000 character limit'
        );
      }
    });

    return this.send(recipientId, {
      ...textOrAttachment,
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
    action: SenderAction
  ): Promise<SendSenderActionResponse> =>
    this._http.post(`/me/messages?access_token=${this._accessToken}`, {
      recipient: {
        id: recipientId,
      },
      sender_action: action,
    });

  turnTypingIndicatorsOn = (
    recipientId: string
  ): Promise<SendSenderActionResponse> =>
    this.sendSenderAction(recipientId, 'typing_on');

  turnTypingIndicatorsOff = (
    recipientId: string
  ): Promise<SendSenderActionResponse> =>
    this.sendSenderAction(recipientId, 'typing_off');

  /**
   * Upload API
   *
   * https://developers.facebook.com/docs/messenger-platform/send-api-reference/attachment-upload/v2.8
   */
  uploadAttachment = (type: string, url: string) =>
    this._http.post(
      `/me/message_attachments?access_token=${this._accessToken}`,
      {
        message: {
          attachment: {
            type,
            payload: {
              url,
              is_reusable: true,
            },
          },
        },
      }
    );

  uploadAudio = (url: string) => this.uploadAttachment('audio', url);
  uploadImage = (url: string) => this.uploadAttachment('image', url);
  uploadVideo = (url: string) => this.uploadAttachment('video', url);
  uploadFile = (url: string) => this.uploadAttachment('file', url);
}
