#!/usr/bin/env node

import { execSync } from 'child_process';
import process from 'process';

export default function transpileTS(): void {
  console.log('Transpiling TS code in', process.cwd());
  try {
    execSync('tsc');
  } catch (err) {
    console.error(err.output.toString());
    throw new Error('TranspileTS');
  }
}

if (!module.parent) transpileTS();
