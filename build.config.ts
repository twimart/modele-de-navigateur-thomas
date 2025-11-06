import { defineConfig } from '@angular-devkit/build-angular';

export default defineConfig({
  build: {
    options: {
      externalDependencies: ['stream', 'crypto', 'util', 'path', 'fs'],
      allowedCommonJsDependencies: [
        'bip39',
        'ed25519-hd-key',
        'buffer',
        'stream-browserify',
        'util',
        'cipher-base',
        'create-hash',
        'pbkdf2',
        'randombytes',
        'sha.js'
      ]
    }
  }
});