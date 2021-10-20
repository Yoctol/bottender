---
id: deployment
title: Deployment
original_id: deployment
---

Deploying a Bottender server is as easy as deploying a regular Node server.

In this section, following fast and simple ways of deployment are introduced:

- [Now](https://zeit.co/now)
- [Heroku](https://www.heroku.com/home)

Note that these services have limited free dynos. If your bots need to be up 24/7, you should consider paid plans or other services.

## Now

You can set vars in `bottender.config.js` as environment vars and secrets.

### Secrets

```sh
$ now secret add my_verify_token 1qaz2wsx
```

You can list, rename and remove your secrets by the following commands:

```sh
$ now secret ls
$ now secret rename my_verify_token verify_token
$ now secret rm my_verify_token
```

### Environment Variables

Use `@var` to set the environment variable with your now secrets.

```sh
$ now -e VERIFY_TOKEN=1qaz2wsx
$ now -e VERIFY_TOKEN=@verify_token
```

### Deploy

```sh
$ now
```

### List Project

```sh
$ now ls
```

### Alias

Make alias to set your customized domain.

```sh
$ now alias zeit-suslhdzwiy.now.sh workshop // workshop.now.sh
$ now alias zeit-suslhdzwiy.now.sh bottender.com // upgrade plan
```

## Heroku

You can deploy your bot on Heroku simply using Heroku CLI after creating a new app.

```sh
$ heroku login
```

### Creating a New Git Repository

```sh
$ cd my-project/
$ git init
$ heroku git:remote -a your-app-name // for existing repositories, simply add heroku remote
```

### Setting Server Port

[Heroku](https://devcenter.heroku.com/articles/runtime-principles#web-servers) use `$PORT` environment variable to tell apps which port should their server listen. You should make sure your bot server is listening on `process.env.PORT` instead of any other hard-coded ports.

For example,

```js
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`server is running on ${port} port...`);
});
```

### Setting Node Version

Make sure your Node version on Heroku is higher than 7.6.0. These lines can be added to `package.json` to specify the Node version.

```json
"engines": {
  "node": ">= 7.6.0"
}
```

### Deploy

```sh
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```
