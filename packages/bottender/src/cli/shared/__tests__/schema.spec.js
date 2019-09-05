import Joi from '@hapi/joi';
import cloneDeep from 'lodash/cloneDeep';

import config from '../__fixtures__/config';
import schema from '../schema';
import tooManyLineRichMenusConfig from '../__fixtures__/tooManyLineRichMenusConfig';
import tooManyMessengerFirstLayer from '../__fixtures__/tooManyMessengerFirstLayer';

describe('general', () => {
  it('should valid', () => {
    const validateResult = Joi.validate(config, schema);
    expect(validateResult.error).toBeNull();
  });
});

describe('Messenger', () => {
  it('should valid without accessToken', () => {
    const newConfig = cloneDeep(config);
    delete newConfig.channels.messenger.accessToken;
    const validateResult = Joi.validate(newConfig, schema);
    expect(validateResult.error).toBeNull();
  });

  it('should check too many messenger menu first layer items', () => {
    const validateResult = Joi.validate(tooManyMessengerFirstLayer, schema);

    expect(validateResult.error).not.toBeNull();

    const { message, type } = validateResult.error.details[0];
    const errorPath = validateResult.error.details[0].path.join('.');

    expect(message).toBe(
      '"call_to_actions" must contain less than or equal to 3 items'
    );
    expect(type).toBe('array.max');
    expect(errorPath).toBe(
      'channels.messenger.profile.persistent_menu.0.call_to_actions'
    );
    expect(validateResult.error.message).toBe(
      'child "channels" fails because [child "messenger" fails because [child "profile" fails because [child "persistent_menu" fails because ["persistent_menu" at position 0 fails because [child "call_to_actions" fails because ["call_to_actions" must contain less than or equal to 3 items]]]]]]'
    );
  });
});

describe('LINE', () => {
  it('should check too many LINE rich menus', () => {
    const validateResult = Joi.validate(tooManyLineRichMenusConfig, schema);

    expect(validateResult.error).not.toBeNull();

    const { message, type } = validateResult.error.details[0];
    const errorPath = validateResult.error.details[0].path.join('.');

    expect(message).toBe(
      '"richMenus" must contain less than or equal to 10 items'
    );
    expect(type).toBe('array.max');
    expect(errorPath).toBe('channels.line.richMenus');
    expect(validateResult.error.message).toBe(
      'child "channels" fails because [child "line" fails because [child "richMenus" fails because ["richMenus" must contain less than or equal to 10 items]]]'
    );
  });
});
