# Messenger Chat Extensions

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/messenger-chat-extensions
cd messenger-chat-extensions
npm install
npm run dev
```

## Idea of this example

This example shows how to make a Messenger bot with Chat Extensions.
You have to add your domain to [Whitelisted Domains](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/domain-whitelisting) and add [Home URL](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/home-url) before this example can work.
You can edit `bottender.config.js` and use `bottender messenger profile set` command to do the setup.

For more information, check [Official Docs](https://developers.facebook.com/docs/messenger-platform/guides/chat-extensions) for Chat Extensions.

## Related examples

* [with-nextjs-webviews](../with-nextjs-webviews)
* [with-config](../with-config)
* [with-config-env](../with-config-env)
