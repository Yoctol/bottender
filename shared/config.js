/* @flow */
import path from 'path';

import { getProjectPath } from './path';

export async function getProjectConfig(
  projectName: string,
  fileName: string
): {} {
  const configPath = path.join(getProjectPath(projectName), 'config', fileName);
  return require(configPath); // eslint-disable-line import/no-dynamic-require, global-require
}
