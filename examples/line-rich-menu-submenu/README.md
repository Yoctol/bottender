# LINE Rich Menu Submenu

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```sh
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/line-rich-menu-submenu
cd line-rich-menu-submenu
```

Install dependencies:

```sh
npm install
```

You must put `accessToken` and `channelSecret` into `bottender.config.js`.

If you are not familiar with LINE Bot, you may refer to Bottender's doc, [Setup LINE](https://bottender.js.org/docs/channel-line-setup) to find detailed instructions.

After that, you should follow this [document](https://bottender.js.org/docs/channel-line-rich-menu#set-up-submenu) to set up three rich menu objects. You can use the file `main_menu.jpg`, `submenu_A.jpg`, `submenu_B.jpg` as the rich menu images.

Next, you can run the bot with this npm script:

```sh
npm run dev
```

This command will start server for bot developing at `http://localhost:5000`.

If you successfully start the server, you will get a webhook URL like `https://xxxxxxxx.ngrok.io/webhooks/line` from command line.

## Set Webhook

To set the webhook, go to [LINE developers console](https://developers.line.me/console/) and use the webhook URL you get from running `npm run dev` to edit webhook information for your channel.

## Idea of This Example

This example is a simple bot running on [LINE](https://line.me/) to demonstrate how to set up submenus under a main rich menu.

## Related Examples

- [line-hello-world](../line-hello-world)
- [line-rich-menu](../line-rich-menu)
