import randomItem from 'random-item';

export default actions => {
  const Fn = async () => {
    return randomItem(actions);
  };

  const names = actions.map(action => action.name || 'Anonymous');

  const name = `Random(${names.join(', ')})`;

  Object.defineProperty(Fn, 'name', { value: name });

  return Fn;
};
