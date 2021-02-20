#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import process from 'process';

const currentWorkingDirectory = process.cwd();
const TS_CONFIG = path.resolve(currentWorkingDirectory, 'tsconfig.json');
const PRODUCTION_TS_CONFIG = path.resolve(
  currentWorkingDirectory,
  'tsconfig.production.json',
);

export default function transpileTS(): void {
  try {
    const hasProductionConfig = fs.existsSync(PRODUCTION_TS_CONFIG);
    const configFile = hasProductionConfig ? PRODUCTION_TS_CONFIG : TS_CONFIG;
    if (!hasProductionConfig) {
      console.warn('⚠️ No production tsconfig file found');
    }
    console.info(
      `🛠 Transpiling TS code in ${currentWorkingDirectory}  using ${configFile}`,
    );
    execSync(`tsc -p ${configFile}`);
  } catch (err) {
    console.error(err.output.toString());
    throw new Error('TranspileTS');
  }
}

if (!module.parent) transpileTS();
