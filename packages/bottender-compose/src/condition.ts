export default conds => {
  const Fn = async (context, ...otherArgs) => {
    for (let i = 0; i < conds.length; i += 1) {
      const [predicate, Action] = conds[i];

      /* eslint-disable no-await-in-loop */
      if (await predicate(context, ...otherArgs)) {
        return Action;
      }
      /* eslint-enable no-await-in-loop */
    }
  };

  const names = conds.map(([, Action]) => Action.name || 'Anonymous');

  const name = `Condition(${names.join(', ')})`;

  Object.defineProperty(Fn, 'name', { value: name });

  return Fn;
};
