import path from 'path';

import { toAbsolutePath, getProjectPath } from '../path';

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

describe('#getProjectPath', () => {
  it('should get project absolute path', () => {
    const projectPath = getProjectPath('caco-white-day');

    expect(path.isAbsolute(projectPath)).toBe(true);
    expect(projectPath).toMatch(path.join('projects', 'caco-white-day'));
  });
});
