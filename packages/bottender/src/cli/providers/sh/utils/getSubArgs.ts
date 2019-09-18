import { Spec, Result, Options } from 'arg';

import getArgs from './getArgs';

const getSubArgs = <T extends Spec, R extends Spec>(
  argv: Result<R>,
  argsOptions: T,
  argOptions: Options = { permissive: true }
): Result<T> & Pick<Result<R>, Exclude<keyof R, '_'>> => {
  const { _, ...rest } = argv;

  return {
    ...getArgs(_, argsOptions, argOptions),
    ...rest,
  } as Result<T> & Pick<Result<R>, Exclude<keyof R, '_'>>;
};

export default getSubArgs;
