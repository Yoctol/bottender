---
id: channel-line-flex
title: Sending Flex Message
---

[Flex message](https://developers.line.biz/en/docs/messaging-api/using-flex-messages/) is one of the most powerful features

![](https://user-images.githubusercontent.com/3382565/68373526-1222d080-017e-11ea-9461-8f26fdfdc527.png)

## Sending Hello World Flex Message

![](https://user-images.githubusercontent.com/3382565/68382618-0ee41080-018f-11ea-8fb1-82e3dde7521f.png)

To send flex messages, call `context.sendFlex()` with your flex content:

```js
async function App(context) {
  await context.sendFlex({
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'text',
          text: 'Hello,',
        },
        {
          type: 'text',
          text: 'World!',
        },
      ],
    },
  });
}
```

## An Advance Flex Message Example

Let's see a much more complicated example.

![](https://user-images.githubusercontent.com/3382565/68382617-0ee41080-018f-11ea-817c-3a4ace1c24f1.png)

```js
async function App(context) {
  await context.sendFlex({
    type: 'bubble',
    hero: {
      type: 'image',
      url:
        'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
      size: 'full',
      aspectRatio: '20:13',
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'Brown Cafe',
          weight: 'bold',
          size: 'xl',
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'lg',
          contents: [
            {
              type: 'box',
              layout: 'baseline',
              contents: [
                {
                  type: 'text',
                  text: 'Place',
                  color: '#aaaaaa',
                  size: 'sm',
                  flex: 1,
                },
                {
                  type: 'text',
                  text: 'Miraina Tower, 4-1-6 Shinjuku, Tokyo',
                  wrap: true,
                  color: '#666666',
                  size: 'sm',
                  flex: 5,
                },
              ],
            },
          ],
        },
      ],
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'button',
          action: {
            type: 'uri',
            label: 'WEBSITE',
            uri: 'https://linecorp.com',
          },
        },
      ],
    },
  });
}
```

> **Note: You can use simulator to preview your flex messages.**
>
> - [Flex Message Simulator](https://developers.line.biz/console/fx/)
> - [Flex Message Simulator(Beta)](https://developers.line.biz/console/fx-beta/)

## Sending Carousel Content

You can send carousel flex contents by using `carousel` as top level container:

```js
async function App(context) {
  const bubbleContent = {
    type: 'bubble',
    // ...other attributes
  };
  await context.sendFlex({
    type: 'carousel',
    contents: [
      // put multiple bubbles in your carousel
      bubbleContent,
      bubbleContent,
      bubbleContent,
    ],
  });
}
```
