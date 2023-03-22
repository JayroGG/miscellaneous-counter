import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
export const responsivePixel = (num) => (width / 375) * num // 375 is the standard width for mobile designs