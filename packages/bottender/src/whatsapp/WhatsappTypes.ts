export type MessageReceivedCommon = {
  /**
   * A 34 character unique identifier for the message. May be used to later retrieve this message from the REST API.
   */
  messageSid: string;
  /**
   * A 34 character unique identifier for the message. May be used to later retrieve this message from the REST API.
   */
  smsMessageSid: string;
  /**
   * Same value as MessageSid. Deprecated and included for backward compatibility.
   */
  smsSid: string;
  /**
   * The delivery status of the message.
   */
  smsStatus: 'received';
  /**
   * The 34 character id of the Account this message is associated with.
   */
  accountSid: string;
  /**
   * The phone number or Channel address that sent this message.
   */
  from: string;
  /**
   * The phone number or Channel address of the recipient.
   */
  to: string;
  /**
   * The text body of the message. Up to 1600 characters long.
   */
  body: string;
  /**
   * For outbound messages, this property indicates the number of SMS messages it took to deliver the body of the message.
   */
  numSegments: string;
  /**
   * The version of the API.
   */
  apiVersion: '2010-04-01';
  /**
   * The city of the sender
   */
  fromCity?: string;
  /**
   * The state or province of the sender.
   */
  fromState?: string;
  /**
   * The postal code of the called sender.
   */
  fromZip?: string;
  /**
   * The country of the called sender.
   */
  fromCountry?: string;
  /**
   * The city of the recipient.
   */
  toCity?: string;
  /**
   * The state or province of the recipient.
   */
  toState?: string;
  /**
   * The postal code of the recipient.
   */
  toZip?: string;
  /**
   * The country of the recipient.
   */
  toCountry?: string;
};

export type TextMessageReceived = MessageReceivedCommon & {
  /**
   * The number of media items associated with your message
   */
  numMedia: '0';
};

/**
 * Twilio sends form variables named MediaUrlX, where X is a zero-based index.
 * WhatsApp messages will only contain one media file per incoming message, so you can access the file at MediaUrl0 on the incoming request from Twilio to your webhook URL.
 */
export type MediaMessageReceived = MessageReceivedCommon & {
  numMedia: '1';
  /**
   * The ContentTypes for the Media stored at MediaUrl0.
   */
  mediaContentType0: string;
  /**
   * A URL referencing the content of the media received in the Message.
   */
  mediaUrl0: string;
};

export type MessageReceived = TextMessageReceived | MediaMessageReceived;

export type MessageStatusCommon<S extends string> = {
  smsStatus: S;
  messageStatus: S;
  smsSid: string;
  channelToAddress: string;
  to: string;
  channelPrefix: 'whatsapp';
  messageSid: string;
  accountSid: string;
  from: string;
  apiVersion: '2010-04-01';
  channelInstallSid: string;
};

export type MessageSent = MessageStatusCommon<'sent'> & {
  structuredMessage: 'false';
};

export type MessageDelivered = MessageStatusCommon<'delivered'> & {
  eventType: 'DELIVERED';
};

export type MessageRead = MessageStatusCommon<'read'> & {
  eventType: 'READ';
};

export type WhatsappRawEvent =
  | MessageReceived
  | MessageSent
  | MessageDelivered
  | MessageRead;
