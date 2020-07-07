---
id: channel-slack-block-kit
title: Slack Surfaces
---

# Introduction

Slack surface is the interface for user to interact and communcate with. User can interact with Slack apps through messages, the Home tab and modals.

For catching up quickly, there are some minimal implementations as follow:

- [the Home Tab](https://github.com/Yoctol/bottender/tree/master/examples/slack-home-tab)
- [Modal Form](https://github.com/Yoctol/bottender/tree/master/examples/slack-modal-form)
- [Modal Update](https://github.com/Yoctol/bottender/tree/master/examples/slack-modal-update)
- [Modal Push](https://github.com/Yoctol/bottender/tree/master/examples/slack-modal-push)
- [Modal on the Home Tab](https://github.com/Yoctol/bottender/tree/master/examples/slack-modal-on-home)

For more information, see Slack's official document, [Slack Surfaces](https://api.slack.com/surfaces).

# the Home Tab

The Home tab is a interface that provide a fully customized, one-to-one communication with users. You can introduce all features of your Slack app on the Home tab, and users can directly interact with your Slack app here. You can build your view with block kit and modals.

To show the Home tab to users, you must enable the Home tab on the Slack Developer Console.

Once enabled, the `app_home_opened` event will be triggered when the user tries to send a private message to your Slack app or click on any tab. You can use `views.publish` method when the `app_home_opened` event be triggered to show the Home tab.

The following content assumes that you already have a Slack app and complete the basic setup. If you don’t have one, please read [Slack Setup](channel-slack-setup) first.

For more information, see Slack's official document, [Publishing and updating your app's Home tab](https://api.slack.com/surfaces/tabs/using).

## Enable the Home Tab

The Home tab can be enabled in [Slack Developer Console](https://api.slack.com/apps) → \${YourApp} → App Home → Show Tabs.

![image](https://user-images.githubusercontent.com/563929/86312590-a7b32900-bc55-11ea-8c54-b684e1c1543c.png)

## Subscribe the `app_home_opened` Event

The event `app_home_opened` can be subscribed in [Slack Developer Console](https://api.slack.com/apps) → \${YourApp} → Event Subscriptions → Subscribe to bot events.

![image](https://user-images.githubusercontent.com/563929/86312504-6e7ab900-bc55-11ea-91ec-e80a950e6e64.png)

After completing the settings, re-authorize your Slack workspace to your Slack app.

When you try to send a private message to your Slack app, you will see the home tab appear.

![](https://a.slack-edge.com/6117c/img/api/surfaces/app_home_abstract.png)

For more information, see Slack's official document, [app_home_opened event](https://api.slack.com/events/app_home_opened).

## Display the Home Tab to Specific User

This is an example that using the `views.publish` method to display the Home tab:

```js
const { router, route, slack } = require('bottender/router');

function getBlocks(text) {
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text,
      },
    },
  ];
}

async function Home(context) {
  await context.views.publish({
    userId: context.session.user.id,
    view: {
      type: 'home',
      blocks: getBlocks(`Hello, *home*.`),
    },
  });
}

async function Default(context) {
  await context.sendText('Hello World');
}

module.exports = async function App(context) {
  return router([slack.event('app_home_opened', Home), route('*', Default)]);
};
```

This example demostract that using `slack.event` route method to match the event `app_home_opened` and handle in `Home` action, and build blocks in the `Home` action to show the Home tab content to the user.

For more information, see Slack's official document, [Reference: View payloads](https://api.slack.com/reference/surfaces/views) and [views.publish](https://api.slack.com/methods/views.publish).

## Update the Home Tab

Slack doesn't provider a method to update partial view of the Home tab, you can only build the entire view and use `views.publish` method again to update the Home tab.

The following example is a button counter that displays a button on the Home tab. The Home tab updated after the button is clicked.

Before using the button, please subscribe the interactive event in [Slack Developer Console](https://api.slack.com/apps), please refer to [Interactivity in Blocks](channel-slack-block-kit#interactivity-in-blocks) for detailed instruction.

```js
const { router, route, slack } = require('bottender/router');

let counter = 0;

function getBlocks(text) {
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text,
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'add count',
            emoji: true,
          },
          value: 'add count',
        },
      ],
    },
  ];
}

async function Home(context) {
  await context.views.publish({
    userId: context.session.user.id,
    view: {
      type: 'home',
      blocks: getBlocks(`click count: ${counter}`),
    },
  });
}

async function OnBlockActions(context) {
  if (context.event.action.value === 'add count') {
    counter += 1;
    return Home;
  }
}

async function Default(context) {
  await context.sendText('Hello World');
}

module.exports = async function App(context) {
  return router([
    slack.event('app_home_opened', Home),
    slack.event('block_actions', OnBlockActions),
    route('*', Default),
  ]);
};
```

The function `getBlocks` return an blocks contains a text and a button.

The route `slack.event` with the parameter `block_actions` match and handle with `OnBlockActions` action when user click the button.

The behavior in `OnBlockActions` is to increase the counter by 1 and update the Home tab.

# Modal

![](https://a.slack-edge.com/6117c/img/api/modals/modal-abstract.png)

Modal is a pop-up interface. You can use modals to display forms for collecting data from users.

Modal is usually triggered by a button. The following example is about how to display a modal after clicking the button, and use modal as a simple form.

Before using the button, please subscribe the interactive event in [Slack Developer Console](https://api.slack.com/apps), please refer to [Interactivity in Blocks](channel-slack-block-kit#interactivity-in-blocks) for detailed instruction.

For more information, see Slack's official document, [Using modals in Slack apps](https://api.slack.com/surfaces/modals/using).

## Open a Modal

You can use `views.open` method to open a modal.

```js
function getBlocks(text, buttonValue) {
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text,
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: buttonValue,
            emoji: true,
          },
          value: buttonValue,
        },
      ],
    },
  ];
}

async function ShowModal(context) {
  const { triggerId } = context.event.rawEvent;
  await context.views.open({
    triggerId,
    view: {
      type: 'modal',
      title: {
        type: 'plain_text',
        text: 'Modal Title',
      },
      notifyOnClose: true,
      blocks: getBlocks('in modal', 'update modal'),
    },
  });
}
```

To receive `view_closed` event on modal closing, set `notifyOnClose` to true.

For more information, see Slack's official document, [views.open](https://api.slack.com/methods/views.open).

## Update a Modal

You can use `views.update` method to update a modal.

```js
async function UpdateModal(context) {
  const viewId = context.event.rawEvent.view.id;
  await context.views.update({
    viewId,
    view: {
      type: 'modal',
      title: {
        type: 'plain_text',
        text: 'Modal Title',
      },
      blocks: getBlocks('modal updated', 'update modal again'),
    },
  });
}
```

Assumed that the action `UpdateModal` be triggered by `block_actions` event after user clicking the button on a modal. You can get the view id by `context.event.rawEvent.view.id`, and pass the view id to the method `views.update` to specify the modal we want to update.

For more information, see Slack's official document, [views.update](https://api.slack.com/methods/views.update).

## Modal Related Events

The events related to a modal as follow:

- block_actions
- view_submission
- view_closed

For more information, see Slack's official document, [Handling interaction payloads](https://api.slack.com/interactivity/handling#payloads).

### block_actions

The event `block_actions` is triggered immediately when the user interacts with any interactive component in any block whose type is not input.

For example, if you interact with a date picker in a section block, it will trigger the `block_actions` event, but if you interact with a date picker in an input block, it will not trigger the `block_actions` event.

For more information, see Slack's official document, [Reference: Interactive components payloads](https://api.slack.com/reference/interaction-payloads/block-actions).

### view_submission

The event is triggered when the user presses the submit button at the bottom right of a modal.

You can get the contents of all interactive components in the input block from `view.state.values` in the `view_submission` event.

According to different types of interactive component, you need to get the user input from the different fields in the event.

For more information, see Slack's official document, [`view_submission` event payloads](https://api.slack.com/reference/interaction-payloads/views#view_submission) and [Upgrading to modals](https://api.slack.com/block-kit/dialogs-to-modals#upgrading).

### view_closed

To receive `view_closed` event on modal closing, set `notifyOnClose` to true.

No matter what method the user uses to close the modal, such as clicking outside the modal view, clicking the X in the upper right corner of the modal, or clicking the cancel button of the modal, the `view_closed` event will be triggered.

For more information, see Slack's official document, [`view_closed` event payloads](https://api.slack.com/reference/interaction-payloads/views#view_closed).

This is a full example for updating a modal: [Modal Update](https://github.com/Yoctol/bottender/tree/master/examples/slack-modal-update).

This is a full example for using a modal as a form: [Modal Form](https://github.com/Yoctol/bottender/tree/master/examples/slack-modal-form).

# Multiple Views of a Modal

If you want to overlay another view on the view stack of a modal, you can use `views.push` to overlay a new view.

You can stack up to 3 views. If you try to stack a fourth view, you will get `push_limit_reached` error.

For more information, see Slack's official document, [views.push](https://api.slack.com/methods/views.push).

The following sample code shows you how to use `views.push` method.

```js
let counter = 1;

function getModalView() {
  return {
    type: 'modal',
    title: {
      type: 'plain_text',
      text: `Modal View ${counter}`,
    },
    notifyOnClose: true,
    blocks: getBlocks(`in view ${counter}`, 'push modal'),
  };
}

async function PushModal(context) {
  const { triggerId } = context.event.rawEvent;
  await context.views.push({
    triggerId,
    view: getModalView(),
  });
}
```

Using different methods to close the modal will lead to different results.

For example, when you click outside the modal view or click the X in the upper right corner of the modal, all modals will be closed at once, but when you click the close button of the modal, only the top view of the modal will be closed.

If you want to close all modals by clicking the close button of the modal, you can add `clearOnClose: true` when opening the modal.

This is an example for pushing a modal: [Modal Push](https://github.com/Yoctol/bottender/tree/master/examples/slack-modal-push).

This is an example for using a modal on the Home tab: [Modal on the Home Tab](https://github.com/Yoctol/bottender/tree/master/examples/slack-modal-on-home).
