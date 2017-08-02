/* @flow */

import type { Session } from '../session/Session';

import type { FunctionalHandler } from './Bot';

export type SessionWithUser<U> = {
  ...Session,
  user: U,
};

export interface Connector<B, U> {
  +platform: string,
  getUniqueSessionIdFromRequest(body: B): string,
  shouldSessionUpdate(session: Session, body: B): boolean,
  updateSession(session: Session, body: B): Promise<void>,
  handleRequest(params: {
    body: B,
    session: SessionWithUser<U>,
    handler: FunctionalHandler,
  }): Promise<void>,
}
