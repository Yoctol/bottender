---
id: version-1.0.0-beta-api-messenger-event
title: MessengerEvent
original_id: api-messenger-event
---

#### `rawEvent`

Underlying raw event from Messenger.

Example:

```js
event.rawEvent;
// {
//   sender: { id: '1423587017700273' },
//   recipient: { id: '404217156637689' },
//   timestamp: 1491796363181,
//   message: {
//     mid: 'mid.$cAAE1UUyiiwthh0NPrVbVf4HFNDGl',
//     seq: 348847,
//     text: 'Awesome.',
//   },
// }
```

#### `isMessage`

Determine if the event is a message event.

Example:

```js
event.isMessage; // true
```

#### `message`

The message object from Messenger raw event.

Example:

```js
event.message;
// {
//   mid: 'mid.$cAAE1UUyiiwthh0NPrVbVf4HFNDGl',
//   seq: 348847,
//   text: 'Awesome.',
// }
```

#### `isText`

Determine if the event is a message event which includes text.

Example:

```js
event.isText; // true
```

#### `text`

The text string from Messenger raw event.

Example:

```js
event.text; // 'Awesome.'
```

#### `hasAttachment`

Determine if the event has any attachments.

Example:

```js
event.hasAttachment; // true
```

#### `attachments`

The attachments array from Messenger raw event.

Example:

```js
event.attachments;
// [
//   {
//     type: 'audio',
//     payload: {
//       url: 'https://example.com/bot/audios/audio.mp3',
//     },
//   },
// ]
```

#### `isImage`

Determine if the event is a message event which includes image attachment.

Example:

```js
event.isImage; // true
```

#### `image`

The image attachment from Messenger raw event.

Example:

```js
event.image;
// {
//   url: 'https://example.com/image.jpg',
// }
```

#### `isAudio`

Determine if the event is a message event which includes audio attachment.

Example:

```js
event.isAudio; // true
```

#### `audio`

The audio attachment from Messenger raw event.

Example:

```js
event.audio;
// {
//   url: 'https://example.com/bot/audios/audio.mp3',
// }
```

#### `isVideo`

Determine if the event is a message event which includes video attachment.

Example:

```js
event.isVideo; // true
```

#### `video`

The video attachment from Messenger raw event.

Example:

```js
event.video;
// {
//   url: 'https://example.com/bot/videos/video.mp4',
// }
```

#### `isLocation`

Determine if the event is a message event which includes location attachment.

Example:

```js
event.isLocation; // true
```

#### `location`

The location attachment from Messenger raw event.

Example:

```js
event.location;
// {
//   coordinates: { lat: 0, long: 0 },
// }
```

#### `isFile`

Determine if the event is a message event which includes file attachment.

Example:

```js
event.isFile; // true
```

#### `file`

The file attachment from Messenger raw event.

Example:

```js
event.file;
// {
//   url: 'https://example.com/bot/files/file.doc',
// }
```

#### `isFallback`

Determine if the event is a message event which includes fallback attachment.

Example:

```js
event.isFallback; // true
```

#### `fallback`

The fallback attachment from Messenger raw event.

Example:

```js
event.fallback;
// {
//   URL: 'URL_OF_THE_ATTACHMENT',
//   payload: null,
//   title: 'TITLE_OF_THE_URL_ATTACHMENT',
//   type: 'fallback',
// }
```

#### `isSticker`

Determine if the event is a message event which includes sticker.

Example:

```js
event.isSticker; // true
```

#### `sticker`

The stickerId from Messenger raw event.

Example:

```js
event.sticker; // 369239263222822
```

#### `isLikeSticker`

Determine if the event is a message event which includes 'like' sticker.

Example:

```js
event.isLikeSticker; // true
```

#### `isQuickReply`

Determine if the event is a message event triggered from quick reply.

Example:

```js
event.isQuickReply; // true
```

#### `quickReply`

The quick reply object from Messenger raw event.

Example:

```js
event.quickReply;
// {
//   payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED',
// }
```

#### `isEcho`

Determine if the event is a message event sent from our side.

Example:

```js
event.isEcho; // true
```

#### `isPostback`

Determine if the event is a postback event.

Example:

```js
event.isPostback; // true
```

#### `postback`

The postback object from Messenger raw event.

Example:

```js
event.postback;
// {
//   payload: 'USER_DEFINED_PAYLOAD',
// }
```

#### `isGamePlay`

Determine if the event is an game_play event.

Example:

```js
event.isGamePlay; // true
```

#### `gamePlay`

The gamePlay object from Messenger raw event.

Example:

```js
event.gamePlay;
// {
//   gameId: 'GAME_ID',
//   playerId: 'PLAYER_ID',
//   contextType: 'SOLO',
//   contextId: 'CONTEXT_ID',
//   score: 99,
//   payload: {
//     someKey: 'SOME_VALUE'
//   },
// }
```

#### `isOptin`

Determine if the event is an opt-in event.

Example:

```js
event.isOptin; // true
```

#### `optin`

The optin object from Messenger raw event.

Example:

```js
event.optin;
// {
//   ref: 'PASS_THROUGH_PARAM',
// }
```

#### `isPayment`

Determine if the event is a payment event.

Example:

```js
event.isPayment; // true
```

#### `payment`

The payment object from Messenger raw event.

Example:

```js
event.payment;
// {
//   payload: 'DEVELOPER_DEFINED_PAYLOAD',
//   requestedUserInfo: {
//     shippingAddress: {},
//     contactName: 'Peter Chang',
//     contactEmail: 'peter@anemail.com',
//     contactPhone: '+15105551234',
//   },
//   paymentCredential: {
//     providerType: 'paypal',
//     chargeId: 'ch_18tmdBEoNIH3FPJHa60ep123',
//     fbPaymentId: '123456789',
//   },
//   amount: {
//     currency: 'USD',
//     amount: '29.62',
//   },
//   shippingOptionId: '123',
// }
```

#### `isCheckoutUpdate`

Determine if the event is a checkout update event.

Example:

```js
event.isCheckoutUpdate; // true
```

#### `checkoutUpdate`

The checkoutUpdate object from Messenger raw event.

Example:

```js
event.checkoutUpdate;
// {
//   payload: 'DEVELOPER_DEFINED_PAYLOAD',
//   shippingAddress: {
//     id: 10105655000959552,
//     country: 'US',
//     city: 'MENLO PARK',
//     street1: '1 Hacker Way',
//     street2: '',
//     state: 'CA',
//     postalCode: '94025',
//   },
// }
```

#### `isPreCheckout`

Determine if the event is a pre-checkout event.

Example:

```js
event.isPreCheckout; // true
```

#### `preCheckout`

The preCheckout object from Messenger raw event.

Example:

```js
event.preCheckout;
// {
//   payload: 'xyz',
//   requestedUserInfo: {
//     shippingAddress: {
//       name: 'Tao Jiang',
//       street1: '600 Edgewater Blvd',
//       street2: '',
//       city: 'Foster City',
//       state: 'CA',
//       country: 'US',
//       postalCode: '94404',
//     },
//     contactName: 'Tao Jiang',
//   },
//   amount: {
//     currency: 'USD',
//     amount: '2.70',
//   },
// }
```

#### `isRead`

Determine if the event is a message read event.

Example:

```js
event.isRead; // true
```

#### `read`

The read object from Messenger raw event.

Example:

```js
event.read;
// {
//   seq: 38,
//   watermark: 1458668856253,
// }
```

#### `isDelivery`

Determine if the event is a message delivery event.

Example:

```js
event.isDelivery; // true
```

#### `delivery`

The delivery object from Messenger raw event.

Example:

```js
event.delivery;
// {
//   mids: ['mid.1458668856218:ed81099e15d3f4f233'],
//   watermark: 1458668856253,
//   seq: 37,
// }
```

#### `isPayload`

Determine if the event is a postback or quick reply which includes payload.

Example:

```js
event.isPayload; // true
```

#### `payload`

The payload received from postback or quick reply.

Example:

```js
event.payload; // 'USER_DEFINED_PAYLOAD'
```

#### `isPolicyEnforcement`

Determine if the event is a policy enforcement event.

Example:

```js
event.isPolicyEnforcement; // true
```

#### `policyEnforcement`

The policy enforcement object from Messenger raw event.

Example:

```js
event.policyEnforcement;
// {
//   action: 'block',
//   reason:
//     'The bot violated our Platform Policies (https://developers.facebook.com/policy/#messengerplatform). Common violations include sending out excessive spammy messages or being non-functional.',
// }
```

#### `isAppRoles`

Determine if the event is an app roles event.

Example:

```js
event.isAppRoles; // true
```

#### `appRoles`

The app roles object from Messenger raw event.

Example:

```js
event.appRoles;
// {
//   '123456789': ['automation'],
// }
```

#### `isStandby`

Determine if the event is a standby event.

Example:

```js
event.isStandby; // true
```

#### `isPassThreadControl`

Determine if the event is a pass thread control event.

Example:

```js
event.isPassThreadControl; // true
```

#### `passThreadControl`

The pass thread control object from Messenger raw event.

Example:

```js
event.passThreadControl;
// {
//   metadata: 'additional content that the caller wants to set',
//   newOwnerAppId: '123456789',
// }
```

#### `isTakeThreadControl`

Determine if the event is a take thread control event.

Example:

```js
event.isTakeThreadControl; // true
```

#### `takeThreadControl`

The take thread control object from Messenger raw event.

Example:

```js
event.takeThreadControl;
// {
//   metadata: 'additional content that the caller wants to set',
//   previousOwnerAppId: '123456789',
// }
```

#### `isRequestThreadControl`

Determine if the event is a request thread control event.

Example:

```js
event.isRequestThreadControl; // true
```

#### `requestThreadControl`

The take thread control object from Messenger raw event.

Example:

```js
event.requestThreadControl;
// {
//   metadata: 'additional content that the caller wants to set',
//   requestedOwnerAppId: '123456789',
// }
```

#### `isReferral`

Determine if the event is a referral event.

Example:

```js
event.isReferral; // true
```

#### `referral`

The referral object from Messenger event.

Example:

```js
event.referral;
// {
//   ref: 'PASS_THROUGH_PARAM',
//   source: 'SHORTLINK',
//   type: 'OPEN_THREAD',
// }
```

#### `ref`

The ref string from Messenger event.

Example:

```js
event.ref; // 'PASS_THROUGH_PARAM'
```

#### `isFromCustomerChatPlugin`

Determine if the event is from customer chat plugin.

Example:

```js
event.isFromCustomerChatPlugin; // true
```

#### `isBrandedCamera`

Determine if the event is a branded_camera event.

Example:

```js
event.isBrandedCamera; // true
```

#### `brandedCamera`

The brandedCamera object from Messenger event.

Example:

```js
event.brandedCamera;
// {
//   contentIds: ['<CAMERA-EFFECT-ID>', '<CAMERA-EFFECT-ID>'],
//   event: 'dismiss',
// }
```
