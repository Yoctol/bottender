/* @flow */

import { type SessionStore } from '../session/SessionStore';

import Bot from './Bot';
import WechatConnector from './WechatConnector';

export default class WechatBot extends Bot {
  constructor({
    sessionStore,
    verifyToken,
    origin,
  }: {
    sessionStore: SessionStore,
    verifyToken?: string,
    origin?: string,
  }) {
    const connector = new WechatConnector({ verifyToken, origin });
    super({ connector, sessionStore, sync: true });
  }
}
