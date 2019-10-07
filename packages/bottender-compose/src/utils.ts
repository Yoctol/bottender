import get from 'lodash/get';
import replace from 'lodash/replace';
import warning from 'warning';

const TEMPLATE_WHITELIST_KEYS = [
  'context',
  'session',
  'user',
  'event',
  'state',
  'param',
  'props',
];

const contextKeyPrefixResolveMap = {
  context: '',
  session: 'session.',
  user: 'session.user.',
  event: 'event.',
  state: 'state.',
};

const JOINED_KEYS = `(${TEMPLATE_WHITELIST_KEYS.join(
  '|'
)})((\\.[\u4e00-\u9fa5_a-zA-Z0-9]+)+)`; // support Chinese words

export const isValidTemplate = str => {
  const templateRegExp = new RegExp(`{{\\s*${JOINED_KEYS}\\s*}}`, 'g');

  return templateRegExp.test(str);
};

export const compileTemplate = tpl => (context, props) => {
  let compiledResult = tpl;
  const templateRegExp = new RegExp(`{{\\s*${JOINED_KEYS}\\s*}}`, 'g');

  const matchStrings = tpl.match(templateRegExp);

  for (const matchString of matchStrings) {
    const [
      targetString,
      firstWhitelistKey,
      ...otherResults
    ] = templateRegExp.exec(matchString);

    let value;
    let properties;

    warning(
      firstWhitelistKey !== 'params',
      '`param` is deprecated. Use `props` instead.'
    );

    if (['param', 'props'].includes(firstWhitelistKey)) {
      properties = otherResults[0].slice(1);
      value = get(props, properties);
    } else {
      properties = `${
        contextKeyPrefixResolveMap[firstWhitelistKey]
      }${otherResults[0].slice(1)}`;
      value = get(context, properties);
    }

    warning(
      value && typeof value === 'string',
      `Properties accessors (${firstWhitelistKey}.${properties}) in template is invalid -- expected return a non-empty string but got: ${typeof value}`
    );

    compiledResult = replace(compiledResult, targetString, value || '');

    templateRegExp.lastIndex = 0;
  }

  return compiledResult;
};
