---
id: channel-line-flex
title: Flex Messages
---

## Introduction

[Flex messages](https://developers.line.biz/en/docs/messaging-api/using-flex-messages/) are one of the killer features of LINE. As its name suggests, flex messages are highly flexible for various bot scenarios. For example, booking the hotel, showing product catalog, displaying task progress, or rating for tourism.

![](https://user-images.githubusercontent.com/3382565/68373526-1222d080-017e-11ea-9461-8f26fdfdc527.png)

If you are familiar with web programming, you find similarities between the structure of flex messages and HTML. For example:

- The size of a container is calculated based on its components and layout
- The hierarchical structure for the display of nested content

Although flexibility usually comes with complexity (in terms of the amount of code), flex messages are a practical approach to build highly customized chat UI.

Another benefit of flex messages is better desktop support, compared with mobile-only template messages and quick replies.

In the following sections, we will guide you through flex messages examples from simple to complex ones.

## A Minimum Flex Message

The following is a minimum "Hello World" example.

![](https://user-images.githubusercontent.com/3382565/68481176-783c5000-0271-11ea-9ab1-c9869a11f42a.png)

To send flex messages, you can call `context.sendFlex()` with your alt text and flex contents:

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

The above example is a [`bubble`](https://developers.line.biz/en/docs/messaging-api/flex-message-elements/#bubble) type container with two [text](https://developers.line.biz/en/docs/messaging-api/flex-message-elements/#text) components (`Hello,` and `World!`) arranged horizontally by a [box](https://developers.line.biz/en/docs/messaging-api/flex-message-elements/#box) component.

## An Advanced Flex Message Example

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

For more information, see [Flex Message Elements](https://developers.line.biz/en/docs/messaging-api/flex-message-elements/).

> **Note:** When your flex messages are complicated, we recommend checking your code by [Flex Message Simulator](https://developers.line.biz/flex-simulator).

## Carousel Type Flex Messages

A [carousel](https://developers.line.biz/en/docs/messaging-api/flex-message-elements/#carousel) is a container that contains multiple bubble elements. Users can browse the bubbles in the carousel by scrolling horizontally. Carousels are helpful when you are displaying multiple choices, e.g., clothes, restaurants, tourism for the user to choose.

![](https://user-images.githubusercontent.com/3382565/77495528-d44feb80-6e83-11ea-9300-ac5dae922c0d.png)

To send carousel flex messages, use the `carousel` as the top-level container:

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
