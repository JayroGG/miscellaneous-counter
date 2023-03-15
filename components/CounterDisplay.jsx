import React, { useState } from 'react'
import { Text, View, StyleSheet, Vibration } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated'

const CounterDisplay = ({ counterName, func, count }) => {
  // Center of the Counter
  const startingPosition = 0
  // States for reactive coloring
  const [deleting, setDeleting] = useState(false)
  const [fastIncrement, setFastIncrement] = useState(false)
  const [fastDecrement, setFastDecrement] = useState(false)
  const [reseting, setReseting] = useState(false)
  // Shared Values for the animation
  const x = useSharedValue(startingPosition)
  const y = useSharedValue(startingPosition)
  // Dynamic background that changes with the previos states
  let backgroundColor = 'rgba(55, 60, 62, 0.7)'

  deleting ? backgroundColor = '#E55633'
    : fastIncrement ? backgroundColor = '#5CB8C0'
      : fastDecrement ? backgroundColor = '#A25CC0'
        : reseting ? backgroundColor = 'gray'
          : null
  // Animated styles for changing the position of the display
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
      ]
    }
  })
  // Functions that increment, decrement, reset and remove the counter
  const add = () => {
    Vibration.vibrate(10)
    const newCount = count + 1
    AsyncStorage.setItem(counterName, JSON.stringify(newCount))
      .then(func(newCount))
      .catch(err => console.log(err))
  }
  const less = () => {
    Vibration.vibrate(10)
    const newCount = count < 1 ? 0 : count - 1
    AsyncStorage.setItem(counterName, JSON.stringify(newCount))
      .then(func(newCount))
      .catch(err => console.log(err))
  }
  const reset = () => {
    AsyncStorage.setItem(counterName, JSON.stringify(0))
      .then(func(0))
      .catch(err => console.log(err))
  }
  const remove = () => {
    Vibration.vibrate(10)
    AsyncStorage.removeItem(counterName)
      .then(() => func(null))
      .catch(err => console.log(err))
  }
  // Event hanlder provided by Reanimated that is specifically designed to work with the gesture-handler package
  const eventHandler = useAnimatedGestureHandler({
    // Starting position of the display
    onStart: (event, ctx) => {
      ctx.startX = x.value
      ctx.startY = y.value
    },
    onActive: (event, ctx) => {
      // This change thr actual position of the display
      x.value = event.translationX
      y.value = event.translationY
      // Executing methods, and changing the previus states by position
      if (x.value >= 140) {
        x.value = 140
        runOnJS(add)()
        runOnJS(setFastIncrement)(true)
      } else {
        runOnJS(setFastIncrement)(false)
      }
      if (x.value <= -140) {
        x.value = -140
        runOnJS(setFastDecrement)(true)
        runOnJS(less)()
      } else {
        runOnJS(setFastDecrement)(false)
      }
      if (y.value >= 110) {
        y.value = 110
      } 
      if (y.value >= 110 && x.value <= 50 && x.value >= -50) {
        runOnJS(setDeleting)(true)
      }
      else {
        runOnJS(setDeleting)(false)
      }
      if (y.value <= -90) {
        y.value = -90
      } 
      if (y.value <= -90 && x.value <= 50 && x.value >= -50) {
        runOnJS(setReseting)(true)
      } else {
        runOnJS(setReseting)(false)
      }
    },
    onEnd: (event, ctx) => {
      // Verifies the last position when the display was released
      // in order to execute the corresponding methods and states
      if (x.value > 0) {
        runOnJS(add)()
      } else if (x.value < 0) {
        runOnJS(less)()
      }

      if (y.value <= -90 && x.value <= 50 && x.value >= -50) {
        runOnJS(reset)()
      } else if (y.value >= 110 && x.value <= 50 && x.value >= -50) {
        runOnJS(remove)()
      }
      
      runOnJS(setFastIncrement)(false)
      runOnJS(setFastDecrement)(false)
      runOnJS(setReseting)(false)
      // Restarting the display position
      x.value = withSpring(startingPosition, {
        damping: 10,
        mass: .5,
        stiffness: 700,
        overshootClamping: false,
      })
      y.value = withSpring(startingPosition, {
        damping: 10,
        mass: .5,
        stiffness: 700,
        overshootClamping: false,
      })
    }
  })
  return <View>
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={[animatedStyles, styles.animatedContainer]}>
        <Text style={[styles.counterDisplay, { backgroundColor: backgroundColor }]}>{count}</Text>
      </Animated.View>
    </PanGestureHandler>
  </View>
}

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    alignItems: 'center'
  },
  counterDisplay: {
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 100,
    borderRadius: 40,
  }
})

export default CounterDisplay