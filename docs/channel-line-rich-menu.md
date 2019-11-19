---
id: channel-line-rich-menu
title: Rich Menu
---

## Getting Rich Menu ID of User

```js
async function App(context) {
  const richMenu = await context.getLinkedRichMenu();
  console.log(richMenu);
  // {
  //   richMenuId: "rich-menu-id"
  // }
}
```

## Linking Rich Menu to User

```js
await context.linkRichMenu('rich-menu-id');
```

## Unlinking Rich Menu from User

```js
await context.unlinkRichMenu();
```
