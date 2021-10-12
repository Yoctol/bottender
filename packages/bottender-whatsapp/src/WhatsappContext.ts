import { Context } from '@bottender/core';

import TwilioClient from './TwilioClient';
import WhatsappEvent from './WhatsappEvent';

class WhatsappContext extends Context<TwilioClient, WhatsappEvent> {
  /**
   * The name of the platform.
   *
   */
  get platform(): 'whatsapp' {
    return 'whatsapp';
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
      this.event.rawEvent.smsStatus === 'received'
        ? this.event.rawEvent.from
        : this.event.rawEvent.to;

    return this.client.createMessage({
      to,
      body: text,
      ...options,
    });
  }
}

export default WhatsappContext;
