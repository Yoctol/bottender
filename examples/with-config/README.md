# With Config

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/with-config
cd with-config
npm install
npm run dev
```

## Idea of this example

It is just way too much trouble when you handle lots of platform configs
separately. Therefore, we recommend you putting them all together into
[bottender.confg.js](./bottender.config.js) and use it as a parameter of
`createServer`.

## Related examples

* [cross-platform](../cross-platform)
* [server-express](../server-express)
* [messenger-hello-world](../messenger-hello-world)
* [messenger-builder](../messenger-builder)
