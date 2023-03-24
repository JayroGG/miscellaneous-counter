import { useAnimatedStyle } from 'react-native-reanimated'

export const animatedMove = (x,y) => {
 
  return useAnimatedStyle(() => {
    return y && x ? {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
      ]
    } : x ? {
      transform: [
        { translateX: x.value },
      ]
    } : null
  })
}
