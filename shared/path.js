import path from 'path';

export function toAbsolutePath(relativeOrAbsolutePath) {
  if (
    path.isAbsolute(relativeOrAbsolutePath) ||
    relativeOrAbsolutePath.startsWith('~')
  ) {
    return relativeOrAbsolutePath;
  }
  return path.join(process.cwd(), relativeOrAbsolutePath);
}

export function getProjectPath(projectName) {
  return path.resolve(`${__dirname}/../../projects/${projectName}`);
}
