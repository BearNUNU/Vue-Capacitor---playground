import { Haptics, ImpactStyle } from '@capacitor/haptics'

export const nativeHaptic = async () => {
    await Haptics.impact({ style: ImpactStyle.Heavy })
}