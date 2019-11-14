import Joi, { Schema } from '@hapi/joi';

import { Channel } from '../types';

const menuItemSchema = Joi.object().keys({
  type: Joi.string(),
  title: Joi.string(),
  url: Joi.string().when('type', {
    is: 'web_url',
    then: Joi.string().required(),
  }),
  payload: Joi.string().when('type', {
    is: 'postback',
    then: Joi.string().required(),
  }),
  webview_height_ratio: Joi.string(),
  messenger_extensions: Joi.boolean(),
  fallback_url: Joi.string(),
  webview_share_button: Joi.string(),
});

const messengerSchema = Joi.object().keys({
  enabled: Joi.boolean(),
  path: Joi.string(),
  accessToken: Joi.string(),
  verifyToken: Joi.string(),
  pageId: Joi.string(),
  appId: Joi.string(),
  appSecret: Joi.string(),
  fields: Joi.array().items(Joi.string()),
  profile: Joi.object().keys({
    getStarted: Joi.object().keys({
      payload: Joi.string(),
    }),
    persistentMenu: Joi.array().items(
      Joi.object().keys({
        locale: Joi.string(),
        composerInputDisabled: Joi.boolean(),
        callToActions: Joi.array()
          .items(menuItemSchema)
          .max(3)
          .when('composer_input_disabled', {
            is: true,
            then: Joi.array()
              .items(menuItemSchema)
              .max(3)
              .required(),
          }),
      })
    ),
    greeting: Joi.array().items(
      Joi.object().keys({
        locale: Joi.string(),
        text: Joi.string(),
      })
    ),
    iceBreakers: Joi.array().items(
      Joi.object().keys({
        question: Joi.string(),
        payload: Joi.string(),
      })
    ),
    whitelistedDomains: Joi.array().items(Joi.string()),
  }),
});

const lineSchema = Joi.object().keys({
  enabled: Joi.boolean(),
  path: Joi.string(),
  channelSecret: Joi.string().required(),
  accessToken: Joi.string().required(),
});

const telegramSchema = Joi.object().keys({
  enabled: Joi.boolean(),
  path: Joi.string(),
  accessToken: Joi.string().required(),
});

const slackSchema = Joi.object().keys({
  enabled: Joi.boolean(),
  path: Joi.string(),
  accessToken: Joi.string().required(),
  verificationToken: Joi.string(),
});

const viberSchmea = Joi.object().keys({
  enabled: Joi.boolean(),
  path: Joi.string(),
  accessToken: Joi.string().required(),
  sender: Joi.object().keys({
    name: Joi.string(),
    avatar: Joi.string(),
  }),
});

export default function getChannelSchema(channel: Channel): Schema {
  return {
    messenger: messengerSchema,
    line: lineSchema,
    telegram: telegramSchema,
    slack: slackSchema,
    viber: viberSchmea,
  }[channel];
}
