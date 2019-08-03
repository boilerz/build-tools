#!/usr/bin/env node

import { execSync } from 'child_process';
import process from 'process';

export default function copyReadme(): void {
  console.log('Copy README.md from', process.cwd());
  execSync('cp README.md dist');
}

if (!module.parent) copyReadme();
