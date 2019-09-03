const ARG_COMMON = {
  '--help': Boolean,
  '-h': '--help',

  '--version': Boolean,
  '-v': '--version',

  '--skip-validate': Boolean,
};

export default () => ARG_COMMON;
