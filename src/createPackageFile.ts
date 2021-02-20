#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import process from 'process';
import util from 'util';

import omit from 'lodash.omit';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

interface PackageJson {
  name: string;
  private: boolean;
  main: string;
  typings: string;
}

/**
 * Widely inspired by material-ui's build step.
 * @see https://github.com/mui-org/material-ui/blob/next/scripts/copy-files.js
 */
export default async function createPackageFile(): Promise<PackageJson> {
  const packageData: string = await readFileAsync(
    path.resolve(process.cwd(), 'package.json'),
    'utf8',
  );
  const cleanedPackageData: PackageJson = omit(
    JSON.parse(packageData),
    'nyc',
    'scripts',
    'devDependencies',
    'workspaces',
  ) as PackageJson;

  const newPackageData: PackageJson = {
    ...cleanedPackageData,
    private: false,
    main: './index.js',
  };
  const targetPath: string = path.resolve(process.cwd(), 'dist/package.json');

  await writeFileAsync(
    targetPath,
    JSON.stringify(newPackageData, null, 2),
    'utf8',
  );

  console.log(`📦 Created package.json in ${targetPath}`);

  return newPackageData;
}

if (!module.parent) createPackageFile().catch(console.error);
