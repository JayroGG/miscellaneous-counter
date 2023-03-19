import { useAnimatedStyle } from 'react-native-reanimated'

export const animatedMove = (x,y) => {
  return useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
      ]
    }
  })
}
