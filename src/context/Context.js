/* @flow */

import type { Event } from './Event';

export const DEFAULT_MESSAGE_DELAY = 1000;

export interface Context {
  +platform: string,
  +event: Event,
  +session: ?{},
  +sendText: (text: string) => any,
  +sendTextWithDelay: (seconds: number, text: string) => any,
}
