import { WebPlugin } from '@capacitor/core';

import type { MultiWebViewPlugin } from './definitions';

export class MultiWebViewWeb extends WebPlugin implements MultiWebViewPlugin {
  async openWebView(options: { url: string; webviewId: string }): Promise<void> {
    console.log(`[MultiWebView Web] openWebView 호출됨. ID: ${options.webviewId}, URL: ${options.url}`);
    window.open(options.url, '_blank');
  }

  async closeWebView(options: { webviewId: string }): Promise<void> {
    console.log(`[MultiWebView Web] closeWebView 호출됨. ID: ${options.webviewId}`);
  }

  async postMessageToWebView(options: { webviewId: string; data: any }): Promise<void> {
    console.log(`[MultiWebView Web] postMessageToWebView 호출됨. ID: ${options.webviewId}, 데이터:`, options.data);
  }
}
