import type { PluginListenerHandle } from '@capacitor/core';

export interface MultiWebViewPlugin {
  /**
   * 새로운 웹뷰를 띄웁니다.
   */
  openWebView(options: { url: string; webviewId: string }): Promise<void>;

  /**
   * 특정 웹뷰를 닫습니다.
   */
  closeWebView(options: { webviewId: string }): Promise<void>;

  /**
   * 특정 웹뷰에 메시지를 보냅니다 (부모 -> 자식).
   */
  postMessageToWebView(options: { webviewId: string; data: any }): Promise<void>;

  /**
   * 서브 웹뷰로부터 오는 메시지를 수신합니다 (자식 -> 부모).
   */
  addListener(
    eventName: 'onSubWebViewMessage',
    listenerFunc: (payload: { webviewId: string; data: any }) => void,
  ): Promise<PluginListenerHandle>;
}
