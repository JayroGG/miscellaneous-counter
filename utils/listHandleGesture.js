import { Vibration } from 'react-native'
import { setCounter } from '../services/setCounter'
import { runOnJS, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated'
 
 export const listHandleGesture = (x, y, reload) => {

  return useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = x.value
      ctx.startY = y.value
    },
    onActive: (event) => {
      x.value = event.translationX
      y.value = event.translationY

      if (y.value < -100) y.value = -100
      if (x.value > 100) x.value = 100
      if (x.value < -100) x.value = -100

    },
    onEnd: () => {
      if (y.value <= -100) { 
        runOnJS(reload)(true)
        runOnJS(setCounter)() 
        runOnJS(Vibration.vibrate)(10)
       
      }
      
      x.value = withSpring(0, {
        damping: 10,
        mass: .5,
        stiffness: 700,
        overshootClamping: false,
      })
      y.value = withSpring(0, {
        damping: 10,
        mass: .5,
        stiffness: 700,
        overshootClamping: false,
      })
    }
  })
 }
