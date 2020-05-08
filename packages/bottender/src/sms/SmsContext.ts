import Context, { ContextOptions } from '../context/Context';

import SmsEvent from './SmsEvent';
import TwilioClient from './TwilioClient';

class SmsContext extends Context<TwilioClient, SmsEvent> {
  _includeStatusCallback: boolean;

  constructor({
    client,
    event,
    session,
    initialState,
    requestContext,
    emitter,
    includeStatusCallback,
  }: ContextOptions<TwilioClient, SmsEvent> & {
    includeStatusCallback?: boolean;
  }) {
    super({ client, event, session, initialState, requestContext, emitter });
    this._includeStatusCallback = includeStatusCallback ?? false;
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): 'sms' {
    return 'sms';
  }

  /**
   * Send text to the owner of then session.
   *
   */
  async sendText(
    text: string,
    options?: {
      maxPrice?: number;
      provideFeedback?: boolean;
      validityPeriod?: number;
      forceDelivery?: boolean;
      smartEncoded?: boolean;
      persistentAction?: string[];
      mediaUrl?: string[];
    }
  ): Promise<any> {
    const to =
      this._event.rawEvent.smsStatus === 'received'
        ? this._event.rawEvent.from
        : this._event.rawEvent.to;

    const statusCallback = `https://${this.requestContext.headers.host}${this.requestContext.path}`;

    return this._client.createMessage({
      to,
      body: text,
      ...(this._includeStatusCallback && { statusCallback }),
      ...options,
    });
  }
}

export default SmsContext;
