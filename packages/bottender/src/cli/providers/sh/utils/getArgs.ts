import arg, { Spec, Options } from 'arg';

import getCommonArgs from './argCommon';

const getArgs = (argv: string[], argsOptions: Spec, argOptions: Options) =>
  arg(
    {
      ...getCommonArgs(),
      ...argsOptions,
    },
    { ...argOptions, argv }
  );

export default getArgs;
