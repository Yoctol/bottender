import arg from 'arg';

import getCommonArgs from './argCommon';

const getArgs = (argv, argsOptions, argOptions) =>
  arg(
    {
      ...getCommonArgs(),
      ...argsOptions,
    },
    { ...argOptions, argv }
  );

export default getArgs;
