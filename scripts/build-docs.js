const fs = require('fs');

const documentation = require('documentation');

const pairs = [
  ['context/MessengerEvent', 'MessengerEvent'],
  ['context/LINEEvent', 'LINEEvent'],
  ['context/SlackEvent', 'SlackEvent'],
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
        output
      );
    });
});
