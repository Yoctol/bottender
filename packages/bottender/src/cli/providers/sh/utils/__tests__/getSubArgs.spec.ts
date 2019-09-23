import getSubArgs from '../getSubArgs';

it('should be defined', () => {
  expect(getSubArgs).toBeDefined();
});

it('should parse args as expect', () => {
  const args = ['messenger', 'profile', 'set', '--force'];

  const ctx = {
    argv: {
      _: args,
    },
  };

  const result = getSubArgs(ctx.argv, {
    '--force': Boolean,
  });

  expect(result).toEqual({
    _: ['messenger', 'profile', 'set'],
    '--force': true,
  });
});

it('should parse args as expect', () => {
  const args = [
    'messenger',
    'persona',
    'delete',
    '--id',
    '__FAKE_PERSONA_ID__',
  ];

  const ctx = {
    argv: {
      _: args,
    },
  };

  const result = getSubArgs(ctx.argv, {
    '--id': String,
  });

  expect(result).toEqual({
    _: ['messenger', 'persona', 'delete'],
    '--id': '__FAKE_PERSONA_ID__',
  });
});

it('should handle args abbreviation', () => {
  const args = ['messenger', 'persona', 'delete', '-f', 'other-args'];

  const ctx = {
    argv: {
      _: args,
    },
  };

  const result = getSubArgs(ctx.argv, {
    '--force': Boolean,
    '-f': '--force',
  });

  expect(result).toEqual({
    _: ['messenger', 'persona', 'delete', 'other-args'],
    '--force': true,
  });
});
