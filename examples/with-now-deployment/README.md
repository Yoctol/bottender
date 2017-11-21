[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/Yoctol/bottender/tree/master/examples/with-now-deployment)

# With now deployment

## Install and Run

Download this example or clone [bottender](https://github.com/Yoctol/bottender).

```
curl https://codeload.github.com/Yoctol/bottender/tar.gz/master | tar -xz --strip=2 bottender-master/examples/with-now-deployment
cd with-now-deployment
npm install
ACCESS_TOKEN=<YOUR_TOKEN> APP_SECRET=<YOUR_SECRET> VERIFY_TOKEN=<YOUR_VERIFY_TOKEN> npm run dev
```

## Deployment

Make sure you have global `now` installed:

```
npm install -g now
```

Set secrets:

```
now secret add access-token <YOUR_TOKEN>
now secret add app-secret <YOUR_SECRET>
now secret add verify-token <YOUR_VERIFY_TOKEN>
```

Then, deploy with env variables:

```
now -e ACCESS_TOKEN=@access-token -e APP_SECRET=@app-secret -e VERIFY_TOKEN=@verify-token
```

## Idea of this example

This example is a simple bot show how to deploy with
[zeit/now](https://zeit.co/now).

## Related examples

* [messenger-hello-world](../messenger-hello-world)
