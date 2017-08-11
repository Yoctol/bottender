/* @flow */

import type { Event } from './Event';

export const DEFAULT_MESSAGE_DELAY = 1000;

export interface Context {
  +platform: string,
  +event: Event,
  +session: {},
  +sendText: (text: string) => void,
  +sendTextWithDelay: (seconds: number, text: string) => void,
}
