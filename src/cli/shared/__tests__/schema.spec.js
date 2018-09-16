import Joi from 'joi';
import cloneDeep from 'lodash/cloneDeep';

import config from '../__fixtures__/config';
import deepNestedConfig from '../__fixtures__/deepNestedConfig';
import nestedConfig from '../__fixtures__/nestedConfig';
import schema from '../schema';
import tooManyLineRichMenusConfig from '../__fixtures__/tooManyLineRichMenusConfig';
import tooManyMessengerFirstLayer from '../__fixtures__/tooManyMessengerFirstLayer';
import tooManyMessengerSecondLayer from '../__fixtures__/tooManyMessengerSecondLayer';
import tooManyMessengerThirdLayer from '../__fixtures__/tooManyMessengerThirdLayer';

describe('general', () => {
  it('should valid', () => {
    const validateResult = Joi.validate(config, schema);
    expect(validateResult.error).toBeNull();
  });

  it('should valid nested config', () => {
    const validateResult = Joi.validate(nestedConfig, schema);
    expect(validateResult.error).toBeNull();
  });

  it('should valid deep nested config', () => {
    const validateResult = Joi.validate(deepNestedConfig, schema);
    expect(validateResult.error).toBeNull();
  });
});

describe('Messenger', () => {
  it('should valid without accessToken', () => {
    const newConfig = cloneDeep(config);
    delete newConfig.messenger.accessToken;
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
      'messenger.profile.persistent_menu.0.call_to_actions'
    );
    expect(validateResult.error.message).toBe(
      'child "messenger" fails because [child "profile" fails because [child "persistent_menu" fails because ["persistent_menu" at position 0 fails because [child "call_to_actions" fails because ["call_to_actions" must contain less than or equal to 3 items]]]]]'
    );
  });

  it('should check too many messenger menu second layer items', () => {
    const validateResult = Joi.validate(tooManyMessengerSecondLayer, schema);

    expect(validateResult.error).not.toBeNull();

    const { message, type } = validateResult.error.details[0];
    const errorPath = validateResult.error.details[0].path.join('.');

    expect(message).toBe(
      '"call_to_actions" at position 0 does not match any of the allowed types'
    );
    expect(type).toBe('array.includes');
    expect(errorPath).toBe(
      'messenger.profile.persistent_menu.0.call_to_actions.0'
    );
    expect(validateResult.error.message).toBe(
      'child "messenger" fails because [child "profile" fails because [child "persistent_menu" fails because ["persistent_menu" at position 0 fails because [child "call_to_actions" fails because ["call_to_actions" at position 0 does not match any of the allowed types]]]]]'
    );
  });

  it('should check too many messenger menu third layer items', () => {
    const validateResult = Joi.validate(tooManyMessengerThirdLayer, schema);

    expect(validateResult.error).not.toBeNull();

    const { message, type } = validateResult.error.details[0];
    const errorPath = validateResult.error.details[0].path.join('.');

    expect(message).toBe(
      '"call_to_actions" at position 0 does not match any of the allowed types'
    );
    expect(type).toBe('array.includes');
    expect(errorPath).toBe(
      'messenger.profile.persistent_menu.0.call_to_actions.0'
    );
    expect(validateResult.error.message).toBe(
      'child "messenger" fails because [child "profile" fails because [child "persistent_menu" fails because ["persistent_menu" at position 0 fails because [child "call_to_actions" fails because ["call_to_actions" at position 0 does not match any of the allowed types]]]]]'
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
    expect(errorPath).toBe('line.richMenus');
    expect(validateResult.error.message).toBe(
      'child "line" fails because [child "richMenus" fails because ["richMenus" must contain less than or equal to 10 items]]'
    );
  });
});
