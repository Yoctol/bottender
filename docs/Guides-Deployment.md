---
title: Deployment
date: "2017-10-15"
---

# Deployment

## Introduction

In this section, two fast and simple ways of deployment are introduced. You can deploy on
- [Now](https://zeit.co/now)
- [Heroku](https://www.heroku.com/home)

Note that these services have limited free dynos. If your bots need to be up 24/7, you should use upgrade plans or other services.

## Now

You can set vars in bottender.config as enviroment vars and secrets.

### Secrets

```sh
$ now secret add my_verify_token 1qaz2wsx
```
You can list, rename and remove your secrets by following commands:
```sh
$ now secret ls
$ now secret rename my_verify_token verify_token
$ now secret rm my_verify_token
```

### Enviroment Variables

Using `@var` to set the enviroment variable with your now secrets.
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

Make alias to set your customize domain.
```sh
$ now alias zeit-suslhdzwiy.now.sh workshop // workshop.now.sh
$ now alias zeit-suslhdzwiy.now.sh bottender.com // upgrade plan
```

## Heroku

You can deploy your bot on Heroku simply using Heroku CLI after creating a new app.
```sh
$ heroku login
```

### Creating a new Git repositiry

```sh
$ cd my-project/
$ git init
$ heroku git:remote -a your-app-name // for existing repositories, simply add heroku remote
```

### Setting Node version

You should make sure the Node version on Heroku is higher than 7.6.0. These lines can be added in `package.json` to specify the Node version.
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
