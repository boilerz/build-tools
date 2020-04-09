#!/usr/bin/env node

import cleanDist from './cleanDist';
import transpileTS from './transpileTS';
import createPackageFile from './createPackageFile';
import copyReadme from './copyReadme';

export default async function buildTSPackage(): Promise<void> {
  cleanDist();
  transpileTS();
  copyReadme();
  await createPackageFile();
}

if (!module.parent)
  buildTSPackage().catch((err: Error): void => {
    console.error(err);
    process.exit(1);
  });
