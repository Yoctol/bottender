This project was bootstrapped with
[Bottender](https://github.com/Yoctol/bottender) init script.

## Sending Feedback

Always feel free to open issue to
[Bottender](https://github.com/Yoctol/bottender/issues).

## Folder Structure

After creation, your project should look like this:

```
my-bot/
  .gitignore
  node_modules/
  bottender.config.js
  index.js
  package.json
  README.md
  yarn.lock
```

### index.js

All functionalities start from here.\
Mainly it's a server which listen on port 5000. You are encouraged to add more [event listener](https://bottender.js.org/docs/APIReference-Event)
and [handler](https://bottender.js.org/docs/APIReference-Handler) to enrich the bot.

See more examples, please refer to
[Bottender examples](https://github.com/Yoctol/bottender/tree/master/examples).

### bottender.config.js

The config file for the bot.\
We suggests you to put all platform configs into this file and use it as a parameter
of createServer.

## Available Scripts

There are two default scripts you can run:

### `npm run dev`

Run the bot in the development mode.\
It will automatically restart the bot if there are any changes in `index.js`.\
For more information, check [nodemon's repo](https://github.com/remy/nodemon)

### `npm start`

Run the bot without being monitored.\
The bot won't be restarted when you change anything in `index.js`
