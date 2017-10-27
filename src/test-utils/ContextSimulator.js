/* @flow */

declare var jest: any;

class ContextSimulator {
  _platform: string;

  _mockFn: Function;

  constructor({ platform, mockFn }: { platform: string, mockFn?: Function }) {
    this._platform = platform;

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

  createContext({ event }: { event: Object }): Object {
    const base = {
      platform: 'other',

      client: this.createClient(),

      session: {
        id: '__ID__',
        user: this.createUser(),
      },

      event,
      state: {},

      isHandled: false,

      sendState: this._mockFn(),
      resetState: this._mockFn(),
      sendText: this._mockFn(),
      typing: this._mockFn(),
    };

    switch (this._platform) {
      case 'messenger':
        return {
          ...base,
          platform: 'messenger',
          typingOn: this._mockFn(),
          typingOff: this._mockFn(),
          markSeen: this._mockFn(),
          sendAttachment: this._mockFn(),
          sendImage: this._mockFn(),
          sendAudio: this._mockFn(),
          sendVideo: this._mockFn(),
          sendFile: this._mockFn(),
          sendQuickReplies: this._mockFn(),
          sendGenericTemplate: this._mockFn(),
          sendButtonTemplate: this._mockFn(),
          sendListTemplate: this._mockFn(),
          sendReceiptTemplate: this._mockFn(),
          sendAirlineBoardingPassTemplate: this._mockFn(),
          sendAirlineCheckinTemplate: this._mockFn(),
          sendAirlineItineraryTemplate: this._mockFn(),
          sendAirlineFlightUpdateTemplate: this._mockFn(),
        };
      case 'line':
        return {
          ...base,
          platform: 'line',
          isReplied: false,
          sendText: this._mockFn(),
          sendImage: this._mockFn(),
          sendVideo: this._mockFn(),
          sendAudio: this._mockFn(),
          sendLocation: this._mockFn(),
          sendSticker: this._mockFn(),
          sendImagemap: this._mockFn(),
          sendButtonTemplate: this._mockFn(),
          sendConfirmTemplate: this._mockFn(),
          sendCarouselTemplate: this._mockFn(),
          sendImageCarouselTemplate: this._mockFn(),
          replyText: this._mockFn(),
          replyImage: this._mockFn(),
          replyVideo: this._mockFn(),
          replyAudio: this._mockFn(),
          replyLocation: this._mockFn(),
          replySticker: this._mockFn(),
          replyImagemap: this._mockFn(),
          replyButtonTemplate: this._mockFn(),
          replyConfirmTemplate: this._mockFn(),
          replyCarouselTemplate: this._mockFn(),
          replyImageCarouselTemplate: this._mockFn(),
          pushText: this._mockFn(),
          pushImage: this._mockFn(),
          pushVideo: this._mockFn(),
          pushAudio: this._mockFn(),
          pushLocation: this._mockFn(),
          pushSticker: this._mockFn(),
          pushImagemap: this._mockFn(),
          pushButtonTemplate: this._mockFn(),
          pushConfirmTemplate: this._mockFn(),
          pushCarouselTemplate: this._mockFn(),
          pushImageCarouselTemplate: this._mockFn(),
        };
      case 'slack':
        return {
          ...base,
          platform: 'slack',
          postMessage: this._mockFn(),
        };
      case 'telegram':
        return {
          ...base,
          platform: 'telegram',
          sendMessage: this._mockFn(),
          sendPhoto: this._mockFn(),
          sendAudio: this._mockFn(),
          sendDocument: this._mockFn(),
          sendSticker: this._mockFn(),
          sendVideo: this._mockFn(),
          sendVoice: this._mockFn(),
          sendVideoNote: this._mockFn(),
          sendLocation: this._mockFn(),
          sendVenue: this._mockFn(),
          sendContact: this._mockFn(),
          sendChatAction: this._mockFn(),
        };
      default:
        return base;
    }
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
          isGroup_open: false,
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

  createTextContext(text: string) {
    return this.createContext({
      event: {
        isMessage: true,
        isText: true,
        message: {
          text,
        },
        text,
      },
    });
  }
}

export default ContextSimulator;
