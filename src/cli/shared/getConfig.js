import path from 'path';

import invariant from 'invariant';
import get from 'lodash/get';
import importFresh from 'import-fresh';
import Joi from 'joi';
import minimist from 'minimist';

import schema from './schema';

const getConfig = (configPath, platform) => {
  const argv = minimist(process.argv);
  const config = importFresh(path.resolve(configPath));
  if (!argv['skip-validate']) {
    const validateResult = Joi.validate(config, schema, { allowUnknown: true });
    invariant(
      !validateResult.error,
      validateResult.error &&
        `The config format is not valid. ${validateResult.error.message}`
    );
  }
  const result = get(config, platform, undefined);
  invariant(
    result,
    `Could not find \`${
      platform
    }\` key, please check your config file is in the correct format.`
  );
  return result;
};

module.exports = getConfig;
