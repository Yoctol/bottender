import inquirer from 'inquirer';
import jsonfile from 'jsonfile';

import { bold, error } from '../shared/log';

const questions = [
  {
    name: 'platform',
    message: 'What platform of bot do you want to create?',
    type: 'list',
    choices: ['console', 'messenger', 'line', 'slack', 'telegram'],
  },
  {
    name: 'session',
    message: 'Where do you want to store session?',
    type: 'list',
    choices: ['memory', 'file', 'redis', 'mongo'],
  },
  {
    name: 'server',
    message: 'What kind of server do you want to use?',
    type: 'list',
    choices: ['express', 'koa', 'micro', 'restify'],
  },
];

export default (async function init() {
  try {
    inquirer.prompt(questions).then(answers => {
      jsonfile.writeFileSync('init.config.json', answers, { spaces: 2 });
    });
  } catch (err) {
    error('init error with');
    if (err.response) {
      error(`status: ${bold(err.response.status)}`);
      if (err.response.data) {
        error(`data: ${bold(JSON.stringify(err.response.data, null, 2))}`);
      }
    } else {
      error(`message: ${bold(err.message)}`);
    }
    return process.exit(1);
  }
});
