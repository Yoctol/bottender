import curry from 'lodash/curry';

const repeat = (times, action) => {
  const Fn = async (context, ...otherArgs) => {
    for (let i = 0; i < times; i += 1) {
      await action(context, ...otherArgs); // eslint-disable-line no-await-in-loop
    }
  };

  const name = `Repeat(${times}, ${action.name || 'Anonymous'})`;

  Object.defineProperty(Fn, 'name', { value: name });

  return Fn;
};

export default curry(repeat);
