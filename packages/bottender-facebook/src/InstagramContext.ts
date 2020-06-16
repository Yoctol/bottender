import { EventEmitter } from 'events';

import { Context, RequestContext } from 'bottender';
import { MessengerBatchQueue } from 'messenger-batch';

import FacebookClient from './FacebookClient';
import InstagramBatch from './InstagramBatch';
import InstagramEvent from './InstagramEvent';

// TODO: use exported type
type Session = Record<string, any>;

type Options = {
  appId?: string;
  client: FacebookClient;
  event: InstagramEvent;
  session?: Session;
  initialState?: Record<string, any>;
  requestContext?: RequestContext;
  customAccessToken?: string;
  batchQueue?: MessengerBatchQueue | null;
  emitter?: EventEmitter;
};

export default class InstagramContext extends Context<
  FacebookClient,
  InstagramEvent
> {
  _appId: string | undefined;

  _customAccessToken: string | undefined;

  _batchQueue: MessengerBatchQueue | undefined;

  public constructor({
    appId,
    client,
    event,
    session,
    initialState,
    requestContext,
    customAccessToken,
    batchQueue,
    emitter,
  }: Options) {
    super({ client, event, session, initialState, requestContext, emitter });
    this._customAccessToken = customAccessToken;
    this._batchQueue = batchQueue || undefined;
    this._appId = appId;
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): 'instagram' {
    return 'instagram';
  }

  /**
   *
   * @param text The text to be sent in the reply.
   */
  public async sendText(text: string) {
    //
  }

  /**
   * @see https://developers.facebook.com/docs/instagram-api/guides/comment-moderation
   */

  public async hideComment() {}

  public async unhideComment() {}

  public async deleteComment() {}

  public async getReplies() {}

  public async sendReplies() {}

  public async disableComment() {}

  public async enableComment() {}
}
