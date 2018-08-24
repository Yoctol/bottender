# With RxJS

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/with-rxjs
cd with-rxjs
npm install
npm run dev
```

## Idea of this example

[RxJS](https://rxjs-dev.firebaseapp.com/) is a library for reactive programming using Observables. It's good at working with asynchronous data streams and treats everything as a stream ordered in time. 

This is an exmaple for integrating Bottender with RxJS. This shows how to get the last message after user stops entering for one second. It would be useful if user enters messages consecutively, and what the bot needs is just the last one.

## Related examples

* [with-ramda](../with-ramda)
* [console-hello-world](../console-hello-world)
