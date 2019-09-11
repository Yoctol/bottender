import getArgs from './getArgs';

const getSubArgs = (argv, argsOptions, argOptions = { permissive: true }) => {
  const { _, ...rest } = argv;

  return {
    ...getArgs(_, argsOptions, argOptions),
    ...rest,
  };
};

export default getSubArgs;
