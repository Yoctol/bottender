import getArgs from '../getArgs';

it('should be defined', () => {
  expect(getArgs).toBeDefined();
});

it('should parse args as expect', () => {
  const args = ['messenger', 'profile', 'set', '--force'];

  const result = getArgs(
    args,
    {
      '--force': Boolean,
    },
    { permissive: true }
  );

  expect(result).toEqual({
    _: ['messenger', 'profile', 'set'],
    '--force': true,
  });
});

it('should handle args abbreviation', () => {
  const args = ['messenger', 'profile', 'set', '-f', 'other-args'];

  const result = getArgs(
    args,
    {
      '--force': Boolean,
      '-f': '--force',
    },
    { permissive: true }
  );

  expect(result).toEqual({
    _: ['messenger', 'profile', 'set', 'other-args'],
    '--force': true,
  });
});
