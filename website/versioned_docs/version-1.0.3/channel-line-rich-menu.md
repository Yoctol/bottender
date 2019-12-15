---
id: version-1.0.3-channel-line-rich-menu
title: Rich Menu
original_id: channel-line-rich-menu
---

## What is Rich menu

Rich menu is a customizable menu that is displayed on the chat screen to help users interact with your LINE official account. For further information, you can check out the [Official Document](https://developers.line.biz/en/docs/messaging-api/using-rich-menus).

There are four steps to set up a rich menu for your users:

1. Prepare a rich menu image
2. Create a rich menu
3. Upload the rich menu image
4. Link the rich menu to users

## Prepare a rich menu image

A rich menu image is an image file. You can define up to 20 different tappable areas in the image. Here's an example rich menu image:

![Rich menu example](https://i.imgur.com/SVQcKTE.jpg)

In this image, there're six simple buttons. We will define the tappable areas of these buttons in the next step.

Also, remember your rich menu image must follow these requirements:

- Image format: JPEG or PNG
- Image size (pixels): 2500x1686, 2500x843, 1200x810, 1200x405, 800x540, 800x270
- Maximum file size: 1 MB

## Create a rich menu

Before you create a rich menu, you have to create a [rich menu object](https://developers.line.biz/en/reference/messaging-api/#rich-menu-object) which defines the menu's size, tappable areas, etc.

Next, you can create a rich menu by sending an HTTP POST request to the `https://api.line.me/v2/bot/richmenu` endpoint. You have to put your rich menu object in the body and your channel access token in the `Authorization` header.

Here's an example request:

```sh
curl -v -X POST https://api.line.me/v2/bot/richmenu \
  -H 'Authorization: Bearer {channel access token}' \
  -H 'Content-Type:application/json' \
  -d \
  '{
    "size":{
        "width":2500,
        "height":1686
    },
    "selected":false,
    "name":"Controller",
    "chatBarText":"Controller",
    "areas":[
        {
          "bounds":{
              "x":551,
              "y":325,
              "width":321,
              "height":321
          },
          "action":{
              "type":"message",
              "text":"up"
          }
        },
        {
          "bounds":{
              "x":876,
              "y":651,
              "width":321,
              "height":321
          },
          "action":{
              "type":"message",
              "text":"right"
          }
        },
        {
          "bounds":{
              "x":551,
              "y":972,
              "width":321,
              "height":321
          },
          "action":{
              "type":"message",
              "text":"down"
          }
        },
        {
          "bounds":{
              "x":225,
              "y":651,
              "width":321,
              "height":321
          },
          "action":{
              "type":"message",
              "text":"left"
          }
        },
        {
          "bounds":{
              "x":1433,
              "y":657,
              "width":367,
              "height":367
          },
          "action":{
              "type":"message",
              "text":"btn b"
          }
        },
        {
          "bounds":{
              "x":1907,
              "y":657,
              "width":367,
              "height":367
          },
          "action":{
              "type":"message",
              "text":"btn a"
          }
        }
    ]
  }'
```

If you successfully created a rich menu, you will get a response with a rich menu ID.

## Upload the rich menu image

Next, you can upload the rich menu image you prepared in the first step. Again, you upload the image by sending an HTTP POST request to the `https://api-data.line.me/v2/bot/richmenu/{richMenuId}/content` endpoint. Specify the rich menu ID you just got in the `richMenuId` path parameter.

Here's an example request:

```sh
curl -v -X POST https://api-data.line.me/v2/bot/richmenu/{richMenuId}/content \
-H "Authorization: Bearer {channel access token}" \
-H "Content-Type: image/jpeg" \
-T rich_menu.jpg
```

## Link the rich menu to users

In the above three steps, you have finished all the set up for a rich menu. Now, you can link the menu to the users. You can either set a rich menu as the default rich menu for all the users or link a rich menu to an individual user.

### Set the default rich menu

To set the default rich menu, you can send an HTTP POST request to the `https://api.line.me/v2/bot/user/all/richmenu/{richMenuId}` endpoint.

Here's an example request:

```sh
curl -v -X POST https://api.line.me/v2/bot/user/all/richmenu/{richMenuId} \
-H "Authorization: Bearer {channel access token}"
```

### Link a rich menu to an individual user

To link a rich menu to an individual user, you can do it using Bottender when handling a user's event:

```js
await context.linkRichMenu('rich-menu-id');
```

And to unlink a rich Menu from a user, you can use:

```js
await context.unlinkRichMenu();
```

Still, you can link and unlink a rich menu by sending an HTTP POST request to the `https://api.line.me/v2/bot/user/{userId}/richmenu/{richMenuId}` and `https://api.line.me/v2/bot/richmenu/bulk/unlink` endpoints.

Here're example requests:

`link`

```sh
curl -v -X POST https://api.line.me/v2/bot/user/{userId}/richmenu/{richMenuId} \
-H "Authorization: Bearer {channel access token}"
```

`unlink`

```sh
curl -v -X POST https://api.line.me/v2/bot/richmenu/bulk/unlink \
-H "Authorization: Bearer {channel access token}" \
-H "Content-Type: application/json" \
-d '{
  "userIds":["{userId1}","{userId2}"]
}'
```

After you linked a rich menu to a user, you can get the rich menu ID later using Bottender:

```js
async function App(context) {
  const richMenu = await context.getLinkedRichMenu();
  console.log(richMenu);
  // {
  //   richMenuId: "rich-menu-id"
  // }
}
```

You can check out the full example [Here](https://github.com/Yoctol/bottender/tree/master/examples/line-rich-menu).
