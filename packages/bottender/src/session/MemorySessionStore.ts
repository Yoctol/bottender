

import MemoryCacheStore from '../cache/MemoryCacheStore';

import CacheBasedSessionStore from './CacheBasedSessionStore';
import { SessionStore } from './SessionStore';

const MINUTES_IN_ONE_YEAR = 365 * 24 * 60;

type MemoryOption =
  | number
  | {
      maxSize?: ?number,
    };

function getＭaxSize(arg: MemoryOption): ?number {
  if (typeof arg === 'number') {
    return arg;
  }

  if (arg && typeof arg === 'object') {
    return arg.maxSize;
  }
}

export default class MemorySessionStore extends CacheBasedSessionStore
  implements SessionStore {
  constructor(arg: MemoryOption, expiresIn: number) {
    const maxSize = getＭaxSize(arg);

    const cache = new MemoryCacheStore(maxSize);

    super(cache, expiresIn || MINUTES_IN_ONE_YEAR);
  }
}
