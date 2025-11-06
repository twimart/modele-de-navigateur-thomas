import { Buffer } from 'buffer';

// Polyfills globaux pour les bibliothèques Node.js
(window as any).global = window;
(window as any).Buffer = Buffer;
(window as any).process = {
  env: {},
  nextTick: (fn: Function) => setTimeout(fn, 0)
};

// Additional polyfills for Solana web3.js
// Utiliser l'API Web Crypto native du navigateur
if (!window.crypto) {
  (window as any).crypto = {
    getRandomValues: (array: any) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    },
    subtle: undefined
  };
}
