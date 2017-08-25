/* @flow */

import type { Session } from '../session/Session';

export type SessionWithUser<U> = {
  ...Session,
  user: U,
};

export interface Connector<B, U> {
  +platform: string,
  getUniqueSessionIdFromRequest(body: B): ?string,
  updateSession(session: Session, body: B): Promise<void>,
  mapRequestToEvents(body: B): Array<any>,
  createContext(params: {
    event: any,
    session: ?SessionWithUser<U>,
  }): any,
}
