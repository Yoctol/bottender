import { Session, SessionStore } from '@bottender/core';

import MemoryCacheStore from '../cache/MemoryCacheStore';

import CacheBasedSessionStore from './CacheBasedSessionStore';

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
  /**
   * Create a memory-based session store.
   *
   * @param arg - the memory options
   * @param expiresIn - the number of minutes to store the data in the session
   */
  constructor(arg?: MemoryOption, expiresIn?: number) {
    const maxSize = getMaxSize(arg);

    const cache = new MemoryCacheStore<Session>(maxSize);

    super(cache, expiresIn);
  }
}
