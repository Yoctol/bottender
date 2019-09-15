import Joi from '@hapi/joi';
import arg from 'arg';
import get from 'lodash/get';
import invariant from 'invariant';

import getBottenderConfig from './getBottenderConfig';
import schema from './schema';
import { bold } from './log';

const getConfig = (platform: string) => {
  const argv = arg(
    {
      '--skip-validate': Boolean,
    },
    { permissive: true }
  );

  const config = getBottenderConfig();

  if (!argv['--skip-validate']) {
    const validateResult = Joi.validate(config, schema, { allowUnknown: true });

    if (validateResult.error) {
      const { message, type } = validateResult.error.details[0];
      const errorPath = validateResult.error.details[0].path.join('.');
      throw new Error(
        `The config format is not valid.\nmessage: ${message}\npath: ${bold(
          errorPath
        )}\ntype: ${type}`
      );
    }
  }

  const result = get(config, `channels.${platform}`, undefined);

  invariant(
    result,
    `Could not find \`${platform}\` key, please check your config file is in the correct format.`
  );

  return result;
};

export default getConfig;
