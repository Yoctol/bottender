const fs = require('fs');

const documentation = require('documentation');

const pairs = [
  ['context/ConsoleContext', 'ConsoleContext'],
  ['context/ConsoleEvent', 'ConsoleEvent'],
  ['context/MessengerContext', 'MessengerContext'],
  ['context/MessengerEvent', 'MessengerEvent'],
  ['context/LINEContext', 'LINEContext'],
  ['context/LINEEvent', 'LINEEvent'],
  ['context/SlackContext', 'SlackContext'],
  ['context/SlackEvent', 'SlackEvent'],
  ['context/TelegramContext', 'TelegramContext'],
  ['context/TelegramEvent', 'TelegramEvent'],
];

pairs.forEach(pair => {
  documentation
    .build([`${__dirname}/../src/${pair[0]}.js`], {})
    .then(documentation.formats.md)
    .then(output => {
      // output is a string of Markdown data
      fs.writeFileSync(
        `${__dirname}/../docs/APIReference-${pair[1]}.md`,
        `# ${pair[1]}\n\n${output}`
      );
    });
});
