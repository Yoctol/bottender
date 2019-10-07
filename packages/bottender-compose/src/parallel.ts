export default actions => {
  const Fn = (context, ...otherArgs) =>
    Promise.all(actions.map(action => action(context, ...otherArgs)));

  const names = actions.map(action => action.name || 'Anonymous');

  const name = `Parallel(${names.join(', ')})`;

  Object.defineProperty(Fn, 'name', { value: name });

  return Fn;
};
