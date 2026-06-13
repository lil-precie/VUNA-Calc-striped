/* eslint-disable no-console */
import { rmSync, mkdirSync, cpSync } from 'node:fs';

// Wipe prior builds cleanly
rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });

// Move assets exactly as structured
cpSync('index.html', 'dist/index.html');
cpSync('assets', 'dist/assets', { recursive: true });

// eslint-disable-next-line no-undef
console.log('🎉 Production build complete -> dist/');