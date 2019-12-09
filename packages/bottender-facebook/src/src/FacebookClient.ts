import AxiosError from 'axios-error';
import get from 'lodash/get';
import { MessengerClient, MessengerTypes } from 'messaging-api-messenger';

function handleError(err: AxiosError): void {
  if (err.response && err.response.data) {
    const error = get(err, 'response.data.error', {});
    const msg = `Facebook API - ${error.code} ${error.type} ${error.message}`;
    throw new AxiosError(msg, err);
  }
  throw new AxiosError(err.message, err);
}

export default class FacebookClient extends MessengerClient {
  static connect(
    accessTokenOrConfig: string | MessengerTypes.ClientConfig,
    version = '4.0'
  ): FacebookClient {
    return new FacebookClient(accessTokenOrConfig, version);
  }

  sendPrivateReply = (
    objectId: string,
    message: string,
    { accessToken: customAccessToken }: { accessToken?: string } = {}
  ): Promise<any> =>
    this._axios
      .post(
        `/${objectId}/private_replies?access_token=${customAccessToken ||
          this._accessToken}`,
        {
          message,
        }
      )
      .then(res => res.data, handleError);

  sendComment = (
    objectId: string,
    comment:
      | string
      | {
          attachmentId?: string;
          attachmentShareUrl?: string;
          attachmentUrl?: string;
          message?: string;
        },
    { accessToken: customAccessToken }: { accessToken?: string } = {}
  ): Promise<any> => {
    let body;

    if (typeof comment === 'string') {
      body = {
        message: comment,
      };
    } else {
      body = comment;
    }

    return this._axios
      .post(
        `/${objectId}/comments?access_token=${customAccessToken ||
          this._accessToken}`,
        body
      )
      .then(res => res.data, handleError);
  };

  sendLike = (
    objectId: string,
    { accessToken: customAccessToken }: { accessToken?: string } = {}
  ): Promise<any> =>
    this._axios
      .post(
        `/${objectId}/likes?access_token=${customAccessToken ||
          this._accessToken}`
      )
      .then(res => res.data, handleError);

  getComment = (
    commentId: string,
    {
      fields,
      accessToken: customAccessToken,
    }: { fields?: string | string[]; accessToken?: string } = {}
  ): Promise<any> => {
    const conjunctFields = Array.isArray(fields) ? fields.join(',') : fields;
    const fieldsQuery = conjunctFields ? `fields=${conjunctFields}&` : '';

    return this._axios
      .get(
        `/${commentId}?${fieldsQuery}access_token=${customAccessToken ||
          this._accessToken}`
      )
      .then(res => res.data, handleError);
  };

  getLikes = (
    objectId: string,
    {
      summary,
      accessToken: customAccessToken,
    }: { summary?: boolean; accessToken?: string } = {}
  ): Promise<any> =>
    this._axios
      .get(
        `/${objectId}/likes?${
          summary ? 'summary=true&' : ''
        }access_token=${customAccessToken || this._accessToken}`
      )
      .then(res => res.data, handleError);
}
