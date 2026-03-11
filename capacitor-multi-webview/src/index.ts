import { registerPlugin } from '@capacitor/core';

import type { MultiWebViewPlugin } from './definitions';

const MultiWebView = registerPlugin<MultiWebViewPlugin>('MultiWebView', {
  web: () => import('./web').then((m) => new m.MultiWebViewWeb()),
});

export * from './definitions';
export { MultiWebView };
