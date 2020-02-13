import prettier from 'prettier';

import { Platform } from '../types';

const generateAppEntry = (
  isTypescript: boolean,
  platforms: Platform[]
): string => {
  if (!isTypescript) {
    return prettier.format(
      `
module.exports = async function App(context) {
  await context.sendText('Welcome to Bottender');
};
`,
      {
        trailingComma: 'es5',
        singleQuote: true,
        parser: 'babel',
      }
    );
  }

  const contexts = platforms.map(
    platform => `${platform.charAt(0).toUpperCase()}${platform.slice(1)}Context`
  );

  return prettier.format(
    `
import { ${contexts.join(', ')} } from 'bottender';

export default async function App(context: ${contexts.join(
      ' | '
    )}): Promise<void> {
  await context.sendText('Welcome to Bottender');
};
`,
    {
      trailingComma: 'es5',
      singleQuote: true,
      parser: 'typescript',
    }
  );
};

export default generateAppEntry;
