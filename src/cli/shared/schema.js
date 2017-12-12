import Joi from 'joi';

const subMenuItemSchema = Joi.object().keys({
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

const secondLayerMenuItemSchema = Joi.object()
  .keys({
    call_to_actions: Joi.array()
      .items()
      .when('type', {
        is: 'nested',
        then: Joi.array()
          .items(subMenuItemSchema)
          .max(5),
      }),
  })
  .concat(subMenuItemSchema);

const firstLayerMenuItemSchema = Joi.object()
  .keys({
    call_to_actions: Joi.array()
      .items()
      .when('type', {
        is: 'nested',
        then: Joi.array()
          .items(secondLayerMenuItemSchema)
          .max(5),
      }),
  })
  .concat(secondLayerMenuItemSchema);

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
          call_to_actions: Joi.array()
            .items(firstLayerMenuItemSchema)
            .max(3)
            .when('composer_input_disabled', {
              is: true,
              then: Joi.array()
                .items(firstLayerMenuItemSchema)
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
      whitelisted_domains: Joi.array().items(Joi.string()),
    }),
  }),
  line: Joi.object().keys({
    channelSecret: Joi.string().required(),
    accessToken: Joi.string().required(),
    richMenus: Joi.array()
      .items(
        Joi.object().keys({
          size: Joi.object()
            .keys({
              width: Joi.number()
                .integer()
                .required(),
              height: Joi.number()
                .integer()
                .required(),
            })
            .required(),
          selected: Joi.boolean().required(),
          name: Joi.string().required(),
          chatBarText: Joi.string().required(),
          areas: Joi.array()
            .items(
              Joi.object().keys({
                bounds: Joi.object()
                  .keys({
                    x: Joi.number()
                      .integer()
                      .required(),
                    y: Joi.number()
                      .integer()
                      .required(),
                    width: Joi.number()
                      .integer()
                      .required(),
                    height: Joi.number()
                      .integer()
                      .required(),
                  })
                  .required(),
                action: Joi.object().keys({
                  type: Joi.string().required(),
                  data: Joi.string().required(),
                }),
              })
            )
            .required(),
        })
      )
      .max(10),
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
