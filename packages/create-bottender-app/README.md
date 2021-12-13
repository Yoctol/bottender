# Create Bottender App

Create Bottender apps with predefined configurations.

- [Creating an App](#creating-an-app) – How to create a new app.

Create Bottender App works on macOS, Windows, and Linux.
If something doesn’t work, please [file an issue](https://github.com/Yoctol/bottender/issues/new).
If you have questions or need help, please ask in our [Discord](https://discordapp.com/invite/apNsWBz) community.

## Quick Overview

```sh
npx create-bottender-app my-app
cd my-app
npm start -- --console
```

## Creating an App

To create a new app, you may choose one of the following methods:

### npx

```sh
npx create-bottender-app my-app
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a package runner tool that comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/chentsulin/0e640176131a250ce583739cb6e49b6a))_

### npm

```sh
npm init bottender-app my-app
```

_`npm init <initializer>` is available in npm 6+_

### Yarn

```sh
yarn create bottender-app my-app
```

_`yarn create` is available in Yarn 0.25+_

It will create a directory called `my-app` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── .env
├── .env.example
├── bottender.config.js
├── index.js
└── src
    ├── index.test.js
    └── index.js
```

Once the installation is done, you can open your project folder:

```sh
cd my-app
```

Inside the newly created project, you can run some built-in commands:

### `npm start` or `yarn start`

Runs the app in production mode.<br>
By default, server runs on [http://localhost:5000](http://localhost:5000).

To run in [Console Mode](https://bottender.js.org/docs/the-basics-console-mode), provide the `--console` option:

```sh
npm start -- --console
yarn start --console
```

### `npm run dev` or `yarn dev`

Runs the app in development mode.<br>
The bot will automatically reload if you make changes to the code.<br>
By default, server runs on [http://localhost:5000](http://localhost:5000) and ngrok runs on [http://localhost:4040](http://localhost:4040).

To run in [Console Mode](https://bottender.js.org/docs/the-basics-console-mode), provide the `--console` option:

```sh
npm run dev -- --console
yarn dev --console
```

### `npm run lint` or `yarn lint`

Runs the linter rules using [Eslint](https://eslint.org/).

### `npm test` or `yarn test`

Runs the test cases using [Jest](https://jestjs.io/).

## What’s Included?

Your environment will have everything you need to build a modern Bottender app:

- Bottender, ES6+ and TypeScript syntax support.
- A unit test runner - [Jest](https://jestjs.io/) with built-in support for coverage reporting.
- A JavaScript linter - [Eslint](https://eslint.org/) with some predefined rules.
- A live development server that warns about common mistakes.
