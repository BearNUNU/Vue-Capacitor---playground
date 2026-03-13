import { Capacitor } from '@capacitor/core'

/**
 * 네이티브 브릿지 오버라이드
 */
export const overrideNativeBridge = () => {
    // alert 오버라이드
    if (Capacitor.isNativePlatform()) {
        window.alert = (message?: string) => {
            console.log('[Native Alert]', message)
        }
    }
}