/* @flow */

import Context from '../context/Context';

declare var jest: any;

class ContextSimulator {
  _platform: string;

  _initialState: Object;

  _mockFn: Function;

  constructor({
    platform,
    initialState,
    mockFn,
  }: {
    platform: string,
    initialState?: Object,
    mockFn?: Function,
  }) {
    this._platform = platform;
    this._initialState = initialState || {};
    this._mockFn = mockFn || jest.fn;
  }

  createClient() {
    switch (this._platform) {
      case 'messenger':
      case 'line':
      case 'slack':
      case 'telegram':
      default:
        return {};
    }
  }

  createUser() {
    switch (this._platform) {
      case 'messenger':
        return {
          id: '__ID__',
          first_name: 'First',
          last_name: 'Last',
          profile_pic: 'https://example.com/pic.png',
          locale: 'en_US',
          timezone: 8,
          gender: 'male',
        };
      case 'line':
        return {
          id: '__ID__',
          displayName: 'Display',
          userId: '__ID__',
          pictureUrl: 'https://example.com/pic.png',
          statusMessage: 'Status',
        };
      case 'slack':
        return {
          id: '__ID__',
          team_id: '__TEAM_ID__',
          name: 'spengler',
          deleted: false,
          color: '9f69e7',
          real_name: 'episod',
          tz: 'America/Los_Angeles',
          tz_label: 'Pacific Daylight Time',
          tz_offset: -25200,
          profile: {
            avatar_hash: 'ge3b51ca72de',
            status_text: 'Print is dead',
            status_emoji: ':books:',
            real_name: 'Egon Spengler',
            display_name: 'spengler',
            real_name_normalized: 'Egon Spengler',
            display_name_normalized: 'spengler',
            email: 'spengler@ghostbusters.example.com',
            image_24: 'https://.../avatar/e3b51ca72dee4ef87916ae2b9240df50.jpg',
            image_32: 'https://.../avatar/e3b51ca72dee4ef87916ae2b9240df50.jpg',
            image_48: 'https://.../avatar/e3b51ca72dee4ef87916ae2b9240df50.jpg',
            image_72: 'https://.../avatar/e3b51ca72dee4ef87916ae2b9240df50.jpg',
            image_192:
              'https://.../avatar/e3b51ca72dee4ef87916ae2b9240df50.jpg',
            image_512:
              'https://.../avatar/e3b51ca72dee4ef87916ae2b9240df50.jpg',
            team: 'T012AB3C4',
          },
          is_admin: true,
          is_owner: false,
          is_primary_owner: false,
          is_restricted: false,
          is_ultra_restricted: false,
          is_bot: false,
          updated: 1502138686,
          is_app_user: false,
          has_2fa: false,
        };
      case 'telegram':
        return {
          id: '__ID__',
          first_name: 'First',
          last_name: 'Last',
          username: 'Username',
          language_code: 'en',
        };
      default:
        return {
          id: '__ID__',
        };
    }
  }

  createContext({ event, state }: { event: Object, state?: Object }): Object {
    const context: any = new Context({
      client: this.createClient(),
      event: this.createEvent(event),
      session: {
        id: '__ID__',
        user: this.createUser(),
        _state: state || this._initialState,
      },
      initialState: this._initialState,
      requestContext: {},
    });

    context.platform = 'other';
    context.setState = this._mockFn(context.setState.bind(context));
    context.resetState = this._mockFn(context.resetState.bind(context));
    context.sendText = this._mockFn();
    context.typing = this._mockFn();

    switch (this._platform) {
      case 'messenger':
        context.platform = 'messenger';
        context.sendMessage = this._mockFn();
        context.sendAttachment = this._mockFn();
        context.sendImage = this._mockFn();
        context.sendAudio = this._mockFn();
        context.sendVideo = this._mockFn();
        context.sendFile = this._mockFn();
        context.sendQuickReplies = this._mockFn();
        context.sendTemplate = this._mockFn();
        context.sendGenericTemplate = this._mockFn();
        context.sendButtonTemplate = this._mockFn();
        context.sendListTemplate = this._mockFn();
        context.sendOpenGraphTemplate = this._mockFn();
        context.sendMediaTemplate = this._mockFn();
        context.sendReceiptTemplate = this._mockFn();
        context.sendAirlineBoardingPassTemplate = this._mockFn();
        context.sendAirlineCheckinTemplate = this._mockFn();
        context.sendAirlineItineraryTemplate = this._mockFn();
        context.sendAirlineFlightUpdateTemplate = this._mockFn();
        context.typingOn = this._mockFn();
        context.typingOff = this._mockFn();
        context.markSeen = this._mockFn();
        context.passThreadControl = this._mockFn();
        context.passThreadControlToPageInbox = this._mockFn();
        context.takeThreadControl = this._mockFn();
        context.associateLabel = this._mockFn();
        context.dissociateLabel = this._mockFn();
        context.getAssociatedLabels = this._mockFn();
        break;
      case 'line':
        context.platform = 'line';
        context.isReplied = false;
        context.sendText = this._mockFn();
        context.sendImage = this._mockFn();
        context.sendVideo = this._mockFn();
        context.sendAudio = this._mockFn();
        context.sendLocation = this._mockFn();
        context.sendSticker = this._mockFn();
        context.sendImagemap = this._mockFn();
        context.sendButtonTemplate = this._mockFn();
        context.sendConfirmTemplate = this._mockFn();
        context.sendCarouselTemplate = this._mockFn();
        context.sendImageCarouselTemplate = this._mockFn();
        context.reply = this._mockFn();
        context.replyText = this._mockFn();
        context.replyImage = this._mockFn();
        context.replyVideo = this._mockFn();
        context.replyAudio = this._mockFn();
        context.replyLocation = this._mockFn();
        context.replySticker = this._mockFn();
        context.replyImagemap = this._mockFn();
        context.replyButtonTemplate = this._mockFn();
        context.replyConfirmTemplate = this._mockFn();
        context.replyCarouselTemplate = this._mockFn();
        context.replyImageCarouselTemplate = this._mockFn();
        context.push = this._mockFn();
        context.pushText = this._mockFn();
        context.pushImage = this._mockFn();
        context.pushVideo = this._mockFn();
        context.pushAudio = this._mockFn();
        context.pushLocation = this._mockFn();
        context.pushSticker = this._mockFn();
        context.pushImagemap = this._mockFn();
        context.pushButtonTemplate = this._mockFn();
        context.pushConfirmTemplate = this._mockFn();
        context.pushCarouselTemplate = this._mockFn();
        context.pushImageCarouselTemplate = this._mockFn();
        context.leave = this._mockFn();
        context.getLinkedRichMenu = this._mockFn();
        context.linkRichMenu = this._mockFn();
        context.unlinkRichMenu = this._mockFn();
        break;
      case 'slack':
        context.platform = 'slack';
        context.postMessage = this._mockFn();
        break;
      case 'telegram':
        context.platform = 'telegram';
        context.sendMessage = this._mockFn();
        context.sendPhoto = this._mockFn();
        context.sendAudio = this._mockFn();
        context.sendDocument = this._mockFn();
        context.sendSticker = this._mockFn();
        context.sendVideo = this._mockFn();
        context.sendVoice = this._mockFn();
        context.sendVideoNote = this._mockFn();
        context.sendMediaGroup = this._mockFn();
        context.sendLocation = this._mockFn();
        context.sendVenue = this._mockFn();
        context.sendContact = this._mockFn();
        context.sendChatAction = this._mockFn();
        context.sendInvoice = this._mockFn();
        context.sendGame = this._mockFn();
        context.setGameScore = this._mockFn();
        context.getGameHighScores = this._mockFn();
        break;
      default:
    }
    return context;
  }

  createEvent(properties: Object = {}): Object {
    switch (this._platform) {
      case 'messenger':
        return {
          rawEvent: {},
          isMessage: false,
          isText: false,
          hasAttachment: false,
          isImage: false,
          isAudio: false,
          isVideo: false,
          isLocation: false,
          isFile: false,
          isFallback: false,
          isSticker: false,
          isLikeSticker: false,
          isQuickReply: false,
          isEcho: false,
          isPostback: false,
          isOptin: false,
          isPayment: false,
          isCheckoutUpdate: false,
          isPreCheckout: false,
          isRead: false,
          isDelivery: false,
          isPayload: false,
          isPolicyEnforcement: false,
          isAppRoles: false,
          isStandby: false,
          isPassThreadControl: false,
          isTakeThreadControl: false,
          message: null,
          text: null,
          attachments: null,
          image: null,
          audio: null,
          video: null,
          location: null,
          file: null,
          fallback: null,
          sticker: null,
          quickReply: null,
          postback: null,
          optin: null,
          payment: null,
          checkoutUpdate: null,
          preCheckout: null,
          read: null,
          delivery: null,
          payload: null,
          policyEnforcement: null,
          appRoles: null,
          passThreadControl: null,
          takeThreadControl: null,
          ...properties,
        };
      case 'line':
        return {
          rawEvent: {},
          replyToken: null,
          source: {},
          isMessage: false,
          isText: false,
          isImage: false,
          isVideo: false,
          isAudio: false,
          isLocation: false,
          isSticker: false,
          isFollow: false,
          isUnfollow: false,
          isJoin: false,
          isLeave: false,
          isPostback: false,
          isBeacon: false,
          message: null,
          text: null,
          image: null,
          video: null,
          audio: null,
          location: null,
          sticker: null,
          follow: null,
          unfollow: null,
          join: null,
          leave: null,
          postback: null,
          date: null,
          time: null,
          datetime: null,
          beacon: null,
          ...properties,
        };
      case 'slack':
        return {
          rawEvent: {},
          isMessage: false,
          isText: false,
          message: null,
          text: null,
          isChannelsMessage: false,
          isGroupsMessage: false,
          isImMessage: false,
          isMpimMessage: false,
          isAppUninstalled: false,
          isChannelArchive: false,
          isChannelCreated: false,
          isChannelDeleted: false,
          isChannelHistoryChanged: false,
          isChannelRename: false,
          isChannelUnarchive: false,
          isDndUpdated: false,
          isDndUpdatedUser: false,
          isEmailDomainChanged: false,
          isEmojiChanged: false,
          isFileChange: false,
          isFileCommentAdded: false,
          isFileCommentDeleted: false,
          isFileCommentEdited: false,
          isFileCreated: false,
          isFileDeleted: false,
          isFilePublic: false,
          isFileShared: false,
          isFileUnshared: false,
          isGridMigrationFinished: false,
          isGridMigrationStarted: false,
          isGroupArchive: false,
          isGroupClose: false,
          isGroupHistoryChanged: false,
          isGroupOpen: false,
          isGroupRename: false,
          isGroupUnarchive: false,
          isImClose: false,
          isImCreated: false,
          isImHistoryChanged: false,
          isImOpen: false,
          isLinkShared: false,
          isMemberJoinedChannel: false,
          isMemberLeftChannel: false,
          isPinAdded: false,
          isPinRemoved: false,
          isReactionAdded: false,
          isReactionRemoved: false,
          isStarAdded: false,
          isStarRemoved: false,
          isSubteamCreated: false,
          isSubteamMembersChanged: false,
          isSubteamSelfAdded: false,
          isSubteamSelfRemoved: false,
          isSubteamUpdated: false,
          isTeamDomainChange: false,
          isTeamJoin: false,
          isTeamRename: false,
          isTokensRevoked: false,
          isUrlVerification: false,
          isUserChange: false,
          ...properties,
        };
      case 'telegram':
        return {
          rawEvent: {},
          isMessage: false,
          isText: false,
          isAudio: false,
          isDocument: false,
          isGame: false,
          isPhoto: false,
          isSticker: false,
          isVideo: false,
          isVoice: false,
          isVideoNote: false,
          isContact: false,
          isLocation: false,
          isVenue: false,
          isCallbackQuery: false,
          message: null,
          text: null,
          audio: null,
          document: null,
          game: null,
          photo: null,
          sticker: null,
          video: null,
          voice: null,
          videoNote: null,
          contact: null,
          location: null,
          venue: null,
          callbackQuery: null,
          ...properties,
        };
      default:
        return {
          rawEvent: {},
          isMessage: false,
          isText: false,
          message: null,
          text: null,
          ...properties,
        };
    }
  }

  createTextContext(text: string, options?: Object) {
    return this.createContext({
      event: {
        isMessage: true,
        isText: true,
        message: {
          text,
        },
        text,
      },
      ...options,
    });
  }
}

export default ContextSimulator;
