import Joi from '@hapi/joi';

const menuItemSchema = Joi.object().keys({
  // TODO:
});

const schema = Joi.object().keys({
  channels: Joi.object().keys({
    messenger: Joi.object().keys({
      enabled: Joi.boolean(),
      accessToken: Joi.string(),
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
        whitelisted_domains: Joi.array().items(Joi.string()),
      }),
    }),
    line: Joi.object().keys({
      enabled: Joi.boolean(),
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
      enabled: Joi.boolean(),
      accessToken: Joi.string().required(),
    }),
    slack: Joi.object().keys({
      enabled: Joi.boolean(),
      accessToken: Joi.string().required(),
      verificationToken: Joi.string(),
    }),
    viber: Joi.object().keys({
      enabled: Joi.boolean(),
      accessToken: Joi.string().required(),
    }),
  }),
});

export default schema;
