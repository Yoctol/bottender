/* @flow */

import type { Event } from './Event';

export interface Context {
  +platform: string,
  +event: Event,
  +session: ?{},
  +sendText: (text: string) => any,
  +sendTextWithDelay: (seconds: number, text: string) => any,
}
