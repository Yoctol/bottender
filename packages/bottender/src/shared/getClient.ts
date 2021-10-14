import { LineClient } from 'messaging-api-line';
import { MessengerClient } from 'messaging-api-messenger';
import { SlackOAuthClient } from '@bottender/slack';
import { TelegramClient } from '@bottender/telegram';
import { TwilioClient } from '@bottender/whatsapp';
import { ViberClient } from '@bottender/viber';

import { Channel } from '../types';

import getBottenderConfig from './getBottenderConfig';

const CLIENT_MAP = {
  messenger: MessengerClient,
  line: LineClient,
  slack: SlackOAuthClient,
  telegram: TelegramClient,
  viber: ViberClient,
  whatsapp: TwilioClient,
};

function getClient<C extends string>(
  channel: C
): C extends 'messenger'
  ? MessengerClient
  : C extends 'line'
  ? LineClient
  : C extends 'slack'
  ? SlackOAuthClient
  : C extends 'telegram'
  ? TelegramClient
  : C extends 'viber'
  ? ViberClient
  : C extends 'whatsapp'
  ? TwilioClient
  : any {
  const { channels = {} } = getBottenderConfig();

  const channelConfig = (channels as Record<string, any>)[channel];

  if (!channelConfig) {
    throw new Error(
      `getClient: ${channel} config is missing in \`bottender.config.js\`.`
    );
  }

  const ChannelClient = CLIENT_MAP[channel as Channel];

  const client = new ChannelClient(channelConfig as any);

  return client as any;
}

export default getClient;
