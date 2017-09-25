/* @flow */

import type { Event } from './Event';

export interface PlatformContext {
  +platform: string,
  +event: Event,
  +session: ?{},
  setMessageDelay(milliseconds: number): void,
  +sendText: (text: string) => any,
  +sendTextWithDelay: (seconds: number, text: string) => any,
}
