import * as glob from 'glob';

export function getAllEntitiyFiles(): string[] {
  const entityFiles = glob.sync('**/*.entity.ts', {
    ignore: ['node_modules/**'],
  });

  return entityFiles;
}
