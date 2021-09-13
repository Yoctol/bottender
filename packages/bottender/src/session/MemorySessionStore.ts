import MemoryCacheStore from '../cache/MemoryCacheStore';

import CacheBasedSessionStore from './CacheBasedSessionStore';
import SessionStore from './SessionStore';

type MemoryOption =
  | number
  | {
      maxSize?: number;
    };

function getMaxSize(arg?: MemoryOption): number | undefined {
  if (typeof arg === 'number') {
    return arg;
  }

  if (arg && typeof arg === 'object') {
    return arg.maxSize;
  }

  // eslint-disable-next-line no-useless-return
  return;
}

export default class MemorySessionStore
  extends CacheBasedSessionStore
  implements SessionStore
{
  constructor(arg?: MemoryOption, expiresIn?: number) {
    const maxSize = getMaxSize(arg);

    const cache = new MemoryCacheStore(maxSize);

    super(cache, expiresIn);
  }
}
