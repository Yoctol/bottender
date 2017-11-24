import path from 'path';

import pkgDir from 'pkg-dir';
import jsonfile from 'jsonfile';
import get from 'lodash/get';

const getAttachment = filename => {
  const rootPath = pkgDir.sync();
  const pathOfLockFile = path.resolve(rootPath, 'bottender-lock.json');
  const lockfile = jsonfile.readFileSync(pathOfLockFile);
  return {
    id: get(lockfile, ['messenger', filename, 'attachment_id']),
  };
};

export default getAttachment;
