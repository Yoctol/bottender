---
id: channel-slack-block-kit
title: Block Kit
---

[Block Kit](https://api.slack.com/block-kit) is a UI framework for Slack apps that offers a balance of control and flexibility when building experiences in messages and other surfaces.

## Sending Hello World Block Kit Message

```
module.exports = async function App(context) {
  context.postMessage({
    blocks: [
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: '*Hello,*'
          },
          {
            type: 'mrkdwn',
            text: '*World.*'
          },
        ],
      },
    ],
  });
};
```

## An Advance Block Kit Message Example

> **Note: You can use [Block Kit Builder](https://api.slack.com/tools/block-kit-builder) to design your layout.**

The best way to develop your slack bot is to build your block kit message in the [Block Kit Builder](https://api.slack.com/tools/block-kit-builder), and then copy the template into your project like this:

```
function blockTemplate1(user){
  return {
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hello ${user.name}, Assistant to the Regional Manager Dwight! *Michael Scott* wants to know where you'd like to take the Paper Company investors to dinner tonight.\n\n *Please select a restaurant:*`
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*Farmhouse Thai Cuisine*\n:star::star::star::star: 1528 reviews\n They do have some vegan options, like the roti and curry, plus they have a ton of salad stuff and noodles can be ordered without meat!! They have something for everyone here"
        },
        "accessory": {
          "type": "image",
          "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/c7ed05m9lC2EmA3Aruue7A/o.jpg",
          "alt_text": "alt text for image"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*Kin Khao*\n:star::star::star::star: 1638 reviews\n The sticky rice also goes wonderfully with the caramelized pork belly, which is absolutely melt-in-your-mouth and so soft."
        },
        "accessory": {
          "type": "image",
          "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/korel-1YjNtFtJlMTaC26A/o.jpg",
          "alt_text": "alt text for image"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*Ler Ros*\n:star::star::star::star: 2082 reviews\n I would really recommend the  Yum Koh Moo Yang - Spicy lime dressing and roasted quick marinated pork shoulder, basil leaves, chili & rice powder."
        },
        "accessory": {
          "type": "image",
          "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/DawwNigKJ2ckPeDeDM7jAg/o.jpg",
          "alt_text": "alt text for image"
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Farmhouse",
              "emoji": true
            },
            "value": "click_me_123"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Kin Khao",
              "emoji": true
            },
            "value": "click_me_123"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Ler Ros",
              "emoji": true
            },
            "value": "click_me_123"
          }
        ]
      }
    ]
  }
}

module.exports = async function App(context) {
  const viewModel = {
    name: 'bottender'
  }
  context.postMessage(blockTemplate1(viewModel));
};
```

It shows you how to use the template from Block Kit Builder. We suggest you to write a function to render the template with model.

## Interactivity in Blocks

Any interaction is also a webhook that you need to handle. In order to receive the webhook, you need to set your webhook url correctly on your slack app dashboard. There are two kinds of webhook need to be handled on your slack app configuration page. The first one is in the `Event Subscriiptions` tab, and the second one is in the `Interactive Components` tab.

The webhook url you need to fill is the same: https://yourdomain/webhooks/slack

Interactive Components
