import { runOnJS, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated'
import { deleteCounter } from '../services/deleteCounter'
export const counterHandleGesture = (x, id, setCount) => {

  return useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = x.value
    },
    onActive: (event) => {
      x.value = event.translationX
      if (x.value > 0) x.value = 0
    },
    onEnd: () => {
      if (x.value <= -300) runOnJS(deleteCounter)(id, setCount)
      x.value = withSpring(0, {
        damping: 10,
        mass: .5,
        stiffness: 300,
        overshootClamping: false,
      })
    }
  })
}
