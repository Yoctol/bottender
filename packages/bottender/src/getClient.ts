import LineBot from './line/LineBot';
import MessengerBot from './messenger/MessengerBot';
import SlackBot from './slack/SlackBot';
import TelegramBot from './telegram/TelegramBot';
import ViberBot from './viber/ViberBot';
import WhatsappBot from './whatsapp/WhatsappBot';
import getBottenderConfig from './shared/getBottenderConfig';
import getSessionStore from './getSessionStore';
import { Channel } from './types';

const BOT_MAP = {
  messenger: MessengerBot,
  line: LineBot,
  slack: SlackBot,
  telegram: TelegramBot,
  viber: ViberBot,
  whatsapp: WhatsappBot,
};

function getClient(channel: Channel) {
  const { channels = {} } = getBottenderConfig();
  const sessionStore = getSessionStore();

  const channelConfig = (channels as any)[channel];

  if (!channelConfig) {
    return null;
  }

  const ChannelBot = BOT_MAP[channel];

  const channelBot = new ChannelBot({
    ...channelConfig,
    sessionStore,
  } as any);

  return channelBot.connector.client;
}

export default getClient;
