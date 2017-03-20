/* @flow */
import fs from 'fs';
import path from 'path';

import thenify from 'thenify';

import { getProjectPath } from './path';

const readFile = thenify(fs.readFile);

export async function getProjectConfig(
  projectName: string,
  fileName: string,
): string {
  const configPath = path.join(getProjectPath(projectName), 'config', fileName);
  return readFile(configPath, 'utf8');
}
