/* @flow */

import type { Session } from '../session/Session';

import type { FunctionalHandler } from './Bot';

export type SessionWithUser<U> = {
  ...Session,
  user: U,
};

export interface Connector<B, U> {
  +platform: string,
  getSenderIdFromRequest(body: B): string,
  getUserProfile(senderId: string): Promise<U>,
  handleRequest(params: {
    body: B,
    session: SessionWithUser<U>,
    handler: FunctionalHandler,
  }): Promise<void>,
}
