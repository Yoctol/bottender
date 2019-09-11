import path from 'path';

export function toAbsolutePath(relativeOrAbsolutePath: string): string {
  if (
    path.isAbsolute(relativeOrAbsolutePath) ||
    relativeOrAbsolutePath.startsWith('~')
  ) {
    return relativeOrAbsolutePath;
  }
  return path.join(process.cwd(), relativeOrAbsolutePath);
}
