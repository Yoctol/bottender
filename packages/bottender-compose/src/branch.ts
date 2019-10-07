import curry from 'lodash/curry';

function Noop(): void {}

const branch = (predicate, OnTrue, OnFalse = Noop) => {
  const Fn = async (context, ...otherArgs) => {
    if (await predicate(context, ...otherArgs)) {
      return OnTrue;
    }
    return OnFalse;
  };

  const name = `Branch(${OnTrue.name || 'Anonymous'}, ${OnFalse.name ||
    'Anonymous'})`;

  Object.defineProperty(Fn, 'name', { value: name });

  return Fn;
};

export default curry(branch);
