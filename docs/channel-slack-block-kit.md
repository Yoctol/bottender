---
id: channel-slack-block-kit
title: Slack Block Kit
---

 <p><img width="600" src="https://user-images.githubusercontent.com/662387/71472482-31e58500-280e-11ea-91c0-f05096bcede5.png"></p>

<p><img width="600" src="https://user-images.githubusercontent.com/662387/71472483-31e58500-280e-11ea-838d-9dace3857956.png"></p>

Rich interactive UI is a crucial factor for friendly user experience, especially when the majority of bot users are familiar with webs and apps.

[Block Kit](https://api.slack.com/block-kit) is a UI framework for Slack apps that offers a balance of rich interactive and flexibility. Block kits can apply to messages and other [surfaces](https://api.slack.com/surfaces), e.g., modals and home tab.

> **Note:** If you also write LINE Bots, you may sense some similarity between Slack Block Kit and [LINE Flex Messages](./channel-line-flex.md).

## Sending Hello World Block Kit Message

Blocks are visual components that can be stacked and arranged to create app layouts. You may check Slack's official doc, [Building blocks](https://api.slack.com/block-kit/building#getting_started), to understand the philosophy of building blocks. Visit [Reference: Layout blocks](https://api.slack.com/reference/block-kit/blocks) if you want to see all possible blocks.

In the following, you can see a simple example.

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71472395-d74c2900-280d-11ea-91bb-ea9f345cd21f.png"></p>

```js
module.exports = async function App(context) {
  context.postMessage({
    blocks: [
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: '*Hello,*',
          },
          {
            type: 'mrkdwn',
            text: '*World.*',
          },
        ],
      },
    ],
  });
};
```

## An Advanced Block Kit Message Example

When it comes to complicated blocks, we strongly recommend you to build and play with your block kits message in the [Block Kit Builder](https://api.slack.com/tools/block-kit-builder). Then, copy the template into your project like the code below.

It demonstrates how to use the template from Block Kit Builder. Plus, we suggest you write a function to render the template with the model.

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71472409-e8953580-280d-11ea-9c0c-16470b1358be.png"></p>

```js
function blockTemplate1(user) {
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hello ${user.name}, Assistant to the Regional Manager Dwight! *Michael Scott* wants to know where you'd like to take the Paper Company investors to dinner tonight.\n\n *Please select a restaurant:*`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            '*Farmhouse Thai Cuisine*\n:star::star::star::star: 1528 reviews\n They do have some vegan options, like the roti and curry, plus they have a ton of salad stuff and noodles can be ordered without meat!! They have something for everyone here',
        },
        accessory: {
          type: 'image',
          imageUrl:
            'https://s3-media3.fl.yelpcdn.com/bphoto/c7ed05m9lC2EmA3Aruue7A/o.jpg',
          altText: 'alt text for image',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            '*Kin Khao*\n:star::star::star::star: 1638 reviews\n The sticky rice also goes wonderfully with the caramelized pork belly, which is absolutely melt-in-your-mouth and so soft.',
        },
        accessory: {
          type: 'image',
          imageUrl:
            'https://s3-media2.fl.yelpcdn.com/bphoto/korel-1YjNtFtJlMTaC26A/o.jpg',
          altText: 'alt text for image',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            '*Ler Ros*\n:star::star::star::star: 2082 reviews\n I would really recommend the Yum Koh Moo Yang - Spicy lime dressing and roasted quick marinated pork shoulder, basil leaves, chili & rice powder.',
        },
        accessory: {
          type: 'image',
          imageUrl:
            'https://s3-media2.fl.yelpcdn.com/bphoto/DawwNigKJ2ckPeDeDM7jAg/o.jpg',
          altText: 'alt text for image',
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Farmhouse',
              emoji: true,
            },
            value: 'click_me_123',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Kin Khao',
              emoji: true,
            },
            value: 'click_me_123',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Ler Ros',
              emoji: true,
            },
            value: 'click_me_123',
          },
        ],
      },
    ],
  };
}

module.exports = async function App(context) {
  const viewModel = {
    name: 'Bottender',
  };
  context.postMessage(blockTemplate1(viewModel));
};
```

## Interactivity in Blocks

Interactive blocks (e.g., buttons, drop-down menus, date pickers) are part of block kits. So you have to set up a webhook URL to receive payloads. Traverse to [Slack Developer Console](https://api.slack.com/apps) → \${YourApp} → `Interactive Components` → `Interactivity` . And fill in your webhook URL.

<p><img width="800" src="https://user-images.githubusercontent.com/662387/71472551-753ff380-280e-11ea-98ea-63c15b0e15bc.png"></p>

> **Note:**
>
> - There are two kinds of webhook that need to handle on your Slack app configuration page. The first one is in the `Event Subscriptions` tab, and the second one is in the `Interactive Components` tab.
> - By default, the webhook URL you need to fill in `Interactive Components` is like `https://example.com/webhooks/slack`. And you can fill in the same webhook URL for `Event Subscriptions` and `Interactive Components`.
> - If you are not familiar with `Event Subscriptions`, you may refer to another Bottender doc, [Setup Slack](./channel-slack-setup.md). You must complete the settings of `Event Subscriptions` to make your bot work.
