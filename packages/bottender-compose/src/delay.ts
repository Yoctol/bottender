import delay from 'delay';

// eslint-disable-next-line no-unused-vars
export default ms => {
  const Fn = () => delay(ms);

  const name = `Delay(${ms})`;

  Object.defineProperty(Fn, 'name', { value: name });

  return Fn;
};
