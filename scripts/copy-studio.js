#!/usr/bin/env node
const { cpSync, existsSync, rmSync } = require('fs');
const { join } = require('path');

const studioBuildDir = 'studio-build';
const distStudioDir = join('dist', 'studio');

if (!existsSync(studioBuildDir)) {
  console.error(`Error: ${studioBuildDir} directory not found. Run "sanity build studio-build" first.`);
  process.exit(1);
}

if (!existsSync('dist')) {
  console.error(`Error: dist directory not found. Run "vite build" first.`);
  process.exit(1);
}

try {
  // Remove existing studio directory if it exists
  if (existsSync(distStudioDir)) {
    rmSync(distStudioDir, { recursive: true, force: true });
  }
  cpSync(studioBuildDir, distStudioDir, { recursive: true, force: true });
  console.log(`✓ Copied ${studioBuildDir} to ${distStudioDir}`);
} catch (error) {
  console.error('Error copying studio files:', error);
  process.exit(1);
}
