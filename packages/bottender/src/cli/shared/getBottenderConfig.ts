import path from 'path';

import { BottenderConfig } from './types';

/**
 * By default, it will try to require the module from `<root>/bottender.config.js`.
 */
const getBottenderConfig = (): BottenderConfig | never => {
  // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires
  return require(path.resolve('bottender.config.js'));
};

export default getBottenderConfig;
