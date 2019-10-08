---
id: api-handler
title: Handler
---

A Bottender Handler includes many helpful methods and lets you easily handle different kinds of events from platforms.
When an event comes in, the handler will choose the first method matched the condition to handle event.

## API Reference

All methods return handler itself.

See more details about [event](APIReference-Event.md) and [context](APIReference-Context.md).

#### `onXXX(handler)`

- not includes `onEvent`, `onUnhandled`, `onError`

It will always trigger handler function if `event.isXXX` is true and **just have one parameter**.

|  Param  |    Type    |                                         Description                                          |
| :-----: | :--------: | :------------------------------------------------------------------------------------------: |
| handler | `function` | This is a callback function receiving [context](APIReference-Context.md) as first parameter. |

#### `onXXX(predicate, handler)`

- not includes `onEvent`, `onUnhandled`, `onError`

It will trigger handler function if `event.isXXX` is true and predicate function return true.

|   Param   |    Type    |                                                                              Description                                                                               |
| :-------: | :--------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| predicate | `function` | This is a callback function receiving two parameters. Handler function will be triggered if it **returns true**. <br> `function predicate(XXX, context) { /* ... */ }` |
|  handler  | `function` |              This is a callback function receiving [context](APIReference-Context.md) as first parameter. <br> `function handler(context) { /* ... */ }`               |

- Notices: `onText`, `onPayload` also support first parameter to be **string** type or **RegExp**. See more details from [example](#ontext) below.

#### `onEvent(handler)`

It will trigger handler function from **any event**.

|  Param  |    Type    |                                                                 Description                                                                 |
| :-----: | :--------: | :-----------------------------------------------------------------------------------------------------------------------------------------: |
| handler | `function` | This is a callback function receiving [context](APIReference-Context.md) as first parameter. <br> `function handler(context) { /* ... */ }` |

#### `onUnhandled(handler)`

It will trigger handler function if any `onXXX` function don't send any things back to user.

|  Param  |    Type    |                                                                 Description                                                                 |
| :-----: | :--------: | :-----------------------------------------------------------------------------------------------------------------------------------------: |
| handler | `function` | This is a callback function receiving [context](APIReference-Context.md) as first parameter. <br> `function handler(context) { /* ... */ }` |

#### `onError(handler)`

It will trigger handler function if any Error is thrown.

|  Param  |    Type    |                                                                                     Description                                                                                      |
| :-----: | :--------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| handler | `function` | This is a callback function receiving [context](APIReference-Context.md) as first parameter and **error as second parameter**. <br> `function handler(context, error) { /* ... */ }` |

### Methods table

|       Name       | Messenger | LINE | Slack | Telegram |                                                                           Description                                                                            |
| :--------------: | :-------: | :--: | :---: | :------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|        on        |    ✅     |  ✅  |  ✅   |    ✅    |                                   it will trigger function from second parameter if function from first parameter return true.                                   |
|     onEvent      |    ✅     |  ✅  |  ✅   |    ✅    |            it will always trigger function from parameter. <br><br>**Notice: This method will handle all event. Make sure this is the last method.**             |
|    onMessage     |    ✅     |  ✅  |  ✅   |    ✅    |                  it will trigger function from parameter if **context.event.isMessage** is true and function from first parameter return true.                   |
|      onText      |    ✅     |  ✅  |  ✅   |    ✅    |                    it will trigger function from parameter if **context.event.isText** is true and function from first parameter return true.                    |
|   onUnhandled    |    ✅     |  ✅  |  ✅   |    ✅    |                                                 it will trigger function from parameter if event is not handled.                                                 |
|     onError      |    ✅     |  ✅  |  ✅   |    ✅    |                                                    it will trigger function from parameter if error happens.                                                     |
|    onPostback    |    ✅     |  ✅  |       |          |                  it will trigger function from parameter if **context.event.isPostback** is true and function from first parameter return true.                  |
|    onPayload     |    ✅     |  ✅  |       |    ✅    | it will trigger function from parameter if **context.event.isPostback** or **context.event.isQuickReply** is true and function from first parameter return true. |
|    onLocation    |    ✅     |      |       |    ✅    |                  it will trigger function from parameter if **context.event.isLocation** is true and function from first parameter return true.                  |
|     onAudio      |    ✅     |      |       |    ✅    |                   it will trigger function from parameter if **context.event.isAudio** is true and function from first parameter return true.                    |
|     onVideo      |    ✅     |      |       |    ✅    |                   it will trigger function from parameter if **context.event.isVideo** is true and function from first parameter return true.                    |
|    onPayment     |    ✅     |      |       |          |                  it will trigger function from parameter if **context.event.isPayment** is true and function from first parameter return true.                   |
|     onOptin      |    ✅     |      |       |          |                   it will trigger function from parameter if **context.event.isOptin** is true and function from first parameter return true.                    |
| onCheckoutUpdate |    ✅     |      |       |          |               it will trigger function from parameter if **context.event.isCheckoutUpdate** is true and function from first parameter return true.               |
|  onPreCheckout   |    ✅     |      |       |          |                it will trigger function from parameter if **context.event.isPreCheckout** is true and function from first parameter return true.                 |
|   onQuickReply   |    ✅     |      |       |          |                 it will trigger function from parameter if **context.event.isQuickReply** is true and function from first parameter return true.                 |
|      onEcho      |    ✅     |      |       |          |                    it will trigger function from parameter if **context.event.isEcho** is true and function from first parameter return true.                    |
|      onRead      |    ✅     |      |       |          |                    it will trigger function from parameter if **context.event.isRead** is true and function from first parameter return true.                    |
|    onDelivery    |    ✅     |      |       |          |                  it will trigger function from parameter if **context.event.isDelivery** is true and function from first parameter return true.                  |
|     onImage      |    ✅     |      |       |          |                   it will trigger function from parameter if **context.event.isImage** is true and function from first parameter return true.                    |
|      onFile      |    ✅     |      |       |          |                    it will trigger function from parameter if **context.event.isFile** is true and function from first parameter return true.                    |
|    onFallback    |    ✅     |      |       |          |                  it will trigger function from parameter if **context.event.isFallback** is true and function from first parameter return true.                  |
|     onFollow     |           |  ✅  |       |          |                   it will trigger function from parameter if **context.event.isFollow** is true and function from first parameter return true.                   |
|    onUnfollow    |           |  ✅  |       |          |                  it will trigger function from parameter if **context.event.isUnfollow** is true and function from first parameter return true.                  |
|      onJoin      |           |  ✅  |       |          |                    it will trigger function from parameter if **context.event.isJoin** is true and function from first parameter return true.                    |
|     onLeave      |           |  ✅  |       |          |                   it will trigger function from parameter if **context.event.isLeave** is true and function from first parameter return true.                    |
|     onBeacon     |           |  ✅  |       |          |                   it will trigger function from parameter if **context.event.isBeacon** is true and function from first parameter return true.                   |
| onCallbackQuery  |           |      |       |    ✅    |               it will trigger function from parameter if **context.event.isCallbackQuery** is true and function from first parameter return true.                |
|     onPhoto      |           |      |       |    ✅    |                   it will trigger function from parameter if **context.event.isPhoto** is true and function from first parameter return true.                    |
|    onDocument    |           |      |       |    ✅    |                  it will trigger function from parameter if **context.event.isDocument** is true and function from first parameter return true.                  |
|      onGame      |           |      |       |    ✅    |                    it will trigger function from parameter if **context.event.isGame** is true and function from first parameter return true.                    |
|    onSticker     |           |      |       |    ✅    |                  it will trigger function from parameter if **context.event.isSticker** is true and function from first parameter return true.                   |
|     onVoice      |           |      |       |    ✅    |                   it will trigger function from parameter if **context.event.isVoice** is true and function from first parameter return true.                    |
|   onVideoNote    |           |      |       |    ✅    |                 it will trigger function from parameter if **context.event.isVideoNote** is true and function from first parameter return true.                  |
|    onContact     |           |      |       |    ✅    |                  it will trigger function from parameter if **context.event.isContact** is true and function from first parameter return true.                   |
|     onVenue      |           |      |       |    ✅    |                   it will trigger function from parameter if **context.event.isVenue** is true and function from first parameter return true.                    |

## Example

- [MessengerHandler](https://github.com/Yoctol/bottender/tree/master/examples/messenger-builder/index.js)
- [LineHandler](https://github.com/Yoctol/bottender/tree/master/examples/line-builder/index.js)
- [SlackHandler](https://github.com/Yoctol/bottender/tree/master/examples/slack-builder/index.js)
- [TelegramHandler](https://github.com/Yoctol/bottender/tree/master/examples/telegram-builder/index.js)
- [ViberHandler](https://github.com/Yoctol/bottender/tree/master/examples/viber-builder/index.js)

Let's use `MessengerHandler` as an example.

#### `onText`

```
User > yee
MessengerBot > yee.
User > yooooooo~
MessengerBot > Hi there!
User > I am going to sing a song for you.
MessengerBot > You talk too much!
User > yeeeeeee~
MessengerBot > I do not know what you said.
```

```js
const handler = new MessengerHandler()
  .onText('yee', async context => {
    await context.sendText('yee.');
  })
  .onText(/yo/i, async context => {
    await context.sendText('Hi there!');
  })
  .onText(
    (text, context) => {
      return text.length > 20;
    },
    async context => {
      await context.sendText('You talk too much!');
    }
  )
  .onText(async context => {
    await context.sendText('I do not know what you said.');
  });
```

#### `onUnhandled`

```
User > yooooooo~
MessengerBot > Oops. I do nothing.
```

```js
const handler = new MessengerHandler()
  .onText(async context => {
    // event will come here first
    // but you do nothing
  })
  .onUnhandled(async context => {
    await context.sendText('Oops. I do nothing.');
  });
```

#### `onError`

```
User > yooooooo~
MessengerBot > Oops. Error happens.
```

```js
const handler = new MessengerHandler()
  .onText(context => {
    throw new Error('Here comes error!');
  })
  .onError(async (context, err) => {
    console.log(err.message); // Here comes error!
    await context.sendText('Oops. Error happens.');
  });
```
