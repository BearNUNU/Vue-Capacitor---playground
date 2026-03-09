import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { StatusBar, Style } from '@capacitor/status-bar'


/**
 * 햅틱
 */
export const nativeHaptic = async () => {
    await Haptics.impact({ style: ImpactStyle.Heavy })
}


/**
 * 상태바 보이기/숨기기
 */
export const setStatusBarVisible = async (visible: boolean) => {
    try {
        console.log(`[Native] setStatusBarVisible: ${visible}`)
        if (visible) {
            await StatusBar.show()
            // 강제로 밝은 테마로 설정하여 아이콘이 보이게 함 (Android)
            await StatusBar.setStyle({ style: Style.Light })
        } else {
            await StatusBar.hide()
        }
    } catch (error) {
        console.error('[Native] StatusBar Error:', error)
    }
}
