import path from 'path';

import { toAbsolutePath } from '../path';

describe('#toAbsolutePath', () => {
  it('should return absolute path directly', () => {
    expect(toAbsolutePath('/foo/bar')).toBe('/foo/bar');
    expect(toAbsolutePath('/baz/..')).toBe('/baz/..');
    expect(toAbsolutePath('~/')).toBe('~/');
  });

  it('should transform relative path to absolute path', () => {
    const cwd = process.cwd();
    expect(toAbsolutePath('.')).toBe(`${cwd}`);
    expect(toAbsolutePath('..')).toBe(path.join(cwd, '..'));
    expect(toAbsolutePath('bar/baz')).toBe(path.join(cwd, 'bar', 'baz'));
  });
});
