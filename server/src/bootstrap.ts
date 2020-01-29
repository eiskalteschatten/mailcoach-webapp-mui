import symlinkDir from 'symlink-dir';
import path from 'path';

import logger from '@mc/logger';

import tsconfig from '../tsconfig.json';

const outDir = tsconfig.compilerOptions.outDir;
const baseUrl = tsconfig.compilerOptions.baseUrl;
const paths = tsconfig.compilerOptions.paths;

async function setupSymlinks(): Promise<void> {
  logger.info('Setting up symlinks');

  for (let alias in paths) {
    const sources = paths[alias];
    const isDir = alias.slice(-1) === '*';

    alias = alias.replace('*', '');

    const fullAlias = path.resolve('./node_modules', alias);

    for (let source of sources) {
      source = source.replace('*', '');
      let sourcePath = path.resolve(outDir, baseUrl, source);

      if (!isDir) {
        sourcePath += '.js';
      }

      logger.info('-', fullAlias, '->', sourcePath);

      try {
        await symlinkDir(sourcePath, fullAlias);
      }
      catch(error) {
        logger.error(error);
      }
    }
  }

  logger.info('Symlinks created successfully');
}

setupSymlinks();
