#!/usr/bin/env node

import cleanDist from './cleanDist';
import copyRequiredFiles from './copyRequiredFiles';
import createPackageFile from './createPackageFile';
import transpileTS from './transpileTS';

export default async function buildTSPackage(): Promise<void> {
  cleanDist();
  transpileTS();
  copyRequiredFiles();
  await createPackageFile();
}

if (!module.parent)
  buildTSPackage().catch((err: Error): void => {
    console.error(err);
    process.exit(1);
  });
