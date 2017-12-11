import Joi from 'joi';

import schema from '../schema';
import config from '../__fixtures__/config';
import nestedConfig from '../__fixtures__/nestedConfig';
import deepNestedConfig from '../__fixtures__/deepNestedConfig';
import tooManyMessengerFirstLayer from '../__fixtures__/tooManyMessengerFirstLayer';
import tooManyMessengerSecondLayer from '../__fixtures__/tooManyMessengerSecondLayer';
import tooManyMessengerThirdLayer from '../__fixtures__/tooManyMessengerThirdLayer';
import tooManyLineRichMenusConfig from '../__fixtures__/tooManyLineRichMenusConfig';

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

it('should check too many messenger menu first layer items', () => {
  const validateResult = Joi.validate(tooManyMessengerFirstLayer, schema);

  expect(validateResult.error).not.toBeNull();

  const { message, type } = validateResult.error.details[0];
  const errorPath = validateResult.error.details[0].path.join('.');

  expect(message).toBe(
    '"call_to_actions" must contain less than or equal to 3 items'
  );
  expect(type).toBe('array.max');
  expect(errorPath).toBe('messenger.profile.persistent_menu.0.call_to_actions');
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
