# Messenger attachment upload

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-attachment-upload
cd messenger-attachment-upload
npm install
npm run dev
```

You should fill your access token in config file before run your bot.

```
bottender messenger attachment upload
```

> Note: Will auto create a bottender-lock.json file.

Then, you can run it:

```
npm run dev
```

## Idea of this example

This example shows how to use CLI tool which support messenger attachments uploading. And then use util function to get the right attachmentId for bot using.

## Related examples

* [with-config](../with-config)
* [console-hello-world](../console-hello-world)
* [line-hello-world](../line-hello-world)
* [slack-hello-world](../slack-hello-world)
* [telegram-hello-world](../telegram-hello-world)
