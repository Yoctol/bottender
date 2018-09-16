import path from 'path';

import Joi from 'joi';
import get from 'lodash/get';
import importFresh from 'import-fresh';
import invariant from 'invariant';
import minimist from 'minimist';

import schema from './schema';
import { bold } from './log';

const getConfig = (configPath, platform) => {
  const argv = minimist(process.argv);
  const config = importFresh(path.resolve(configPath));
  if (!argv['skip-validate']) {
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
  const result = get(config, platform, undefined);
  invariant(
    result,
    `Could not find \`${platform}\` key, please check your config file is in the correct format.`
  );
  return result;
};

module.exports = getConfig;
