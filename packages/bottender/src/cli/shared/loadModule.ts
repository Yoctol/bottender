import path from 'path';

export default function loadModule(modulePath: string) {
  let mod;
  try {
    mod = require(path.resolve(modulePath)); // eslint-disable-line import/no-dynamic-require
  } catch (err) {} // eslint-disable-line

  if (!mod) return null;

  if (typeof mod === 'object' && mod.default) {
    return mod.default;
  }

  return mod;
}
