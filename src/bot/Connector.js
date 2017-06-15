/* @flow */

import Session from '../session/Session';

import type { FunctionalHandler } from './Bot';

export interface Connector<B, U> {
  +platform: string,
  getSenderIdFromRequest(body: B): string,
  getUserProfile(senderId: string): Promise<U>,
  handleRequest(params: {
    body: B,
    session: {
      ...Session,
      user: U,
    },
    handler: FunctionalHandler,
  }): Promise<void>,
}
