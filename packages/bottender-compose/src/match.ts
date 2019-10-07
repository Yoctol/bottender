import curry from 'lodash/curry';

import _ from './_';

const match = (value, mapping) => {
  const defaultMapping = mapping.find(([pattern]) => pattern === _);
  const otherMapping = mapping.filter(([pattern]) => pattern !== _);

  const Fn = async (context, ...otherArgs) => {
    const val =
      typeof value === 'function' ? await value(context, ...otherArgs) : value;

    for (let i = 0; i < otherMapping.length; i++) {
      const [pattern, Action] = otherMapping[i];
      if (pattern === val) {
        return Action;
      }
    }

    if (defaultMapping) {
      const [, DefaultAction] = defaultMapping;
      return DefaultAction;
    }
  };

  const names = mapping.map(([, Action]) => Action.name || 'Anonymous');

  const name = `Match(${names.join(', ')})`;

  Object.defineProperty(Fn, 'name', { value: name });

  return Fn;
};

export default curry(match);
