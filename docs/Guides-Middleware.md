# Middleware

```js
const { middleware } = require('toolbot-core-experiment');

const handler = middleware([
  (context, next) => {},
  (context, next) => {},
  (context) => {},
]);
```
