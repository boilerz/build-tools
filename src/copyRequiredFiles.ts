#!/usr/bin/env node

import { execSync } from 'child_process';
import process from 'process';

export default function copyRequiredFiles(): void {
  console.log('📝 Copy README.md and yarn.lock from', process.cwd());
  execSync('cp README.md dist');
  execSync('cp yarn.lock dist');
}

if (require.main === module) copyRequiredFiles();
