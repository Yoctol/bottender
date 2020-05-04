/* eslint-disable @typescript-eslint/explicit-function-return-type */

module.exports = {
  '*.ts': () => 'tsc --build tsconfig.build.json',
  '*.{ts,js}': ['eslint --ext=ts,tsx --fix'],
  '*.md': ['prettier --write'],
  'package.json': ['prettier-package-json --write'],
};
