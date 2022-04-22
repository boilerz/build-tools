#!/usr/bin/env node

import { execSync } from 'child_process';
import process from 'process';

export default function cleanDist(): void {
  console.log('🧹 Removing /dist directory in', process.cwd());
  execSync('rm -rf dist');
}

if (require.main === module) cleanDist();
