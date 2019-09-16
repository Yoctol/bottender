import { Spec, Result, Options } from 'arg';

import getArgs from './getArgs';

const getSubArgs = (
  argv: Result<any>,
  argsOptions: Spec,
  argOptions: Options = { permissive: true }
) => {
  const { _, ...rest } = argv;

  return {
    ...getArgs(_, argsOptions, argOptions),
    ...rest,
  };
};

export default getSubArgs;
