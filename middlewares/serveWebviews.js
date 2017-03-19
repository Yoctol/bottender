import fs from 'fs';

import thenify from 'thenify';

const read = thenify(fs.readFile);

const serveWebviews = ({ key = 'name', dirname }) =>
  async ({ response, params }) => {
    try {
      response.body = await read(
        `${dirname}/webviews/${params[key]}.html`,
        'utf8',
      );
    } catch (err) {} // eslint-disable-line no-empty
  };

export default serveWebviews;
