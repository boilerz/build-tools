#!/usr/bin/env node

import cleanDist from './cleanDist';
import transpileTS from './transpileTS';
import createPackageFile from './createPackageFile';
import copyRequiredFiles from './copyRequiredFiles';

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
