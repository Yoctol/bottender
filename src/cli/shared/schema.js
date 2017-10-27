import Joi from 'joi';

const schema = Joi.object().keys({
  messenger: Joi.object().keys({
    accessToken: Joi.string().required(),
    verifyToken: Joi.string(),
    appId: Joi.string(),
    appSecret: Joi.string(),
    fields: Joi.array().items(Joi.string()),
    profile: Joi.object().keys({
      get_started: Joi.object().keys({
        payload: Joi.string(),
      }),
      persistent_menu: Joi.array().items(
        Joi.object().keys({
          locale: Joi.string(),
          composer_input_disabled: Joi.boolean(),
          call_to_actions: Joi.array().items(
            Joi.object().keys({
              type: Joi.string(),
              title: Joi.string(),
              payload: Joi.string(),
            }),
            Joi.object().keys({
              type: Joi.string(),
              title: Joi.string(),
              url: Joi.string(),
            })
          ),
        })
      ),
      greeting: Joi.array().items(
        Joi.object().keys({
          locale: Joi.string(),
          text: Joi.string(),
        })
      ),
      whitelisted_domains: Joi.array().items(Joi.string()),
    }),
  }),
  line: Joi.object().keys({
    channelSecret: Joi.string().required(),
    accessToken: Joi.string().required(),
  }),
  telegram: Joi.object().keys({
    accessToken: Joi.string().required(),
  }),
  slack: Joi.object().keys({
    accessToken: Joi.string().required(),
  }),
  ngrok: Joi.boolean(),
});

export default schema;
