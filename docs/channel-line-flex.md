---
id: channel-line-flex
title: Sending Flex Message
---

## Flex Message, the User Experience Bridge Between Web and Bot

When you are building a LINE bot, you should never miss one of the killer features of LINE, [Flex Messages](https://developers.line.biz/en/docs/messaging-api/using-flex-messages/). As its name suggests, Flex Messages are highly flexible for various bot scenarios. For example, booking the hotel, showing product catalog, displaying task progress, or rating for tourism.

![](https://user-images.githubusercontent.com/3382565/68373526-1222d080-017e-11ea-9461-8f26fdfdc527.png)

If you are familiar with web programming, you will find similarities between the intentions of Flex Messages and HTML. For example:

- The size of a container is calculated based on its components and layout
- The hierarchical structure for the display of nested content

We also argue that Flex Messages as a practical approach towards highly customized chat UI, although flexibility usually comes with complexity (in terms of the amount of code).

Another benefit of Flex Messages is better desktop support, compared with mobile-only Template Messages and quick replies.

In the following sections, we will guide you through Flex Messages examples from simple to complex ones.

## Flex Message Examples

### A Hello World Flex Message

![](https://user-images.githubusercontent.com/3382565/68481176-783c5000-0271-11ea-9ab1-c9869a11f42a.png)

The following is a simple example based on a `bubble` type container with two text components arranged horizontally.

To send flex messages, call `context.sendFlex()` with your flex content:

```js
async function App(context) {
  await context.sendFlex('This is a hello world flex', {
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

### An Advanced Flex Message Example

Let's see a much more complicated example. This example offers a better user experience, where information is positioned carefully with proper emphasis.

![](https://user-images.githubusercontent.com/3382565/68481175-783c5000-0271-11ea-8749-5a0b6ebf8d34.png)

```js
async function App(context) {
  await context.sendFlex('This is an advanced flex', {
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

> **Note: When it comes to complicated Flex Messages, it is recommended to check your code by the Flex Message Simulator.**
>
> - [Flex Message Simulator](https://developers.line.biz/console/fx/)
> - [Flex Message Simulator(Beta)](https://developers.line.biz/console/fx-beta/)

### A Carousel Type Flex Message

You can send carousel Flex Messages by using the `carousel` as the top-level container. It is handy when you are displaying multiple choices, e.g., clothes, restaurants, tourism for the user to choose.

```js
async function App(context) {
  const bubbleContent = {
    type: 'bubble',
    // ...other attributes
  };
  await context.sendFlex('This is a carousel flex', {
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
