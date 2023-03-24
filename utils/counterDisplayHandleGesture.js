import { runOnJS, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated'
import { Vibration } from 'react-native'
import { updateCounter } from '../services/updateCounter'

export const counterDisplayHandleGesture = (x, y, startingPosition, id, counterName, setCount, count, setReseting) => {
  // Functions that increment, decrement, reset and remove the counter
  const add = () => {
    Vibration.vibrate(10)
    const newCount = count + 1

    updateCounter(id, counterName, newCount)
      .then(setCount(newCount))
      .catch(err => console.log(err))
  }
  const less = () => {
    Vibration.vibrate(10)
    const newCount = count < 1 ? 0 : count - 1
    updateCounter(id, counterName, newCount)
      .then(setCount(newCount))
      .catch(err => console.log(err))
  }
  const reset = () => {
    updateCounter(id, counterName, 0)
      .then(setCount(0))
      .catch(err => console.log(err))
  }
  return useAnimatedGestureHandler({

    // Starting position of the display
    onStart: (event, ctx) => {

    },
    onActive: (event, ctx) => {
      // This change thr actual position of the display
      x.value = event.translationX
      y.value = event.translationY
      // Limiting movement
      y.value <= 0 ? y.value = 0
        : y.value >= 65 ? y.value = 65 : y.value
      x.value >= 60 ? x.value = 60
        : x.value <= -60 ? x.value = -60 : x.value
      // Executing methods, and changing the previus states by position

      if (y.value >= 65 && x.value <= 50 && x.value >= -50) runOnJS(setReseting)(true)
      else runOnJS(setReseting)(false)

    },
    onEnd: (event, ctx) => {
      // Verifies the last position when the display was released
      // in order to execute the corresponding methods and states
      if (x.value > 0) runOnJS(add)()
      if (x.value < 0) runOnJS(less)()

      if (y.value >= 65 && x.value <= 50 && x.value >= -50) runOnJS(reset)()

      runOnJS(setReseting)(false)
      // Restarting the display position
      x.value = withSpring(startingPosition, {
        damping: 10,
        mass: .5,
        stiffness: 300,
        overshootClamping: false,
      })
      y.value = withSpring(startingPosition, {
        damping: 10,
        mass: .5,
        stiffness: 300,
        overshootClamping: false,
      })
    }
  })
}
