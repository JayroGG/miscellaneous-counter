import React, { useState } from 'react'
import { Text, View, StyleSheet, Vibration } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated'
import { animatedMove } from '../../utils/animatedStyles'
import { responsivePixel } from '../../utils/responsivePixel'

const CounterDisplay = ({ id, counterName, func, count }) => {
  // Center of the Counter
  const startingPosition = 0
  // State for reactive coloring
  const [reseting, setReseting] = useState(false)
  // Shared Values for the animation
  const x = useSharedValue(startingPosition)
  const y = useSharedValue(startingPosition)
  // Dynamic background that changes with the previos states
  let backgroundColor = '#FEF8EB' // Counter color

  reseting ? backgroundColor = '#F56960' : null
  // Animated styles for changing the position of the display
  const animatedStyles = animatedMove(x, y)

  // Functions that increment, decrement, reset and remove the counter
  const add = () => {
    Vibration.vibrate(10)
    const newCount = count + 1

    AsyncStorage.setItem(id, JSON.stringify({ "counterName": counterName, "count": newCount }))
      .then(func(newCount))
      .catch(err => console.log(err))
  }
  const less = () => {
    Vibration.vibrate(10)
    const newCount = count < 1 ? 0 : count - 1
    AsyncStorage.setItem(id, JSON.stringify({ "counterName": counterName, "count": newCount }))
      .then(func(newCount))
      .catch(err => console.log(err))
  }
  const reset = () => {
    AsyncStorage.setItem(id, JSON.stringify({ "counterName": counterName, "count": 0 }))
      .then(func(0))
      .catch(err => console.log(err))
  }
  const remove = () => {
    Vibration.vibrate(10)
    AsyncStorage.removeItem(id)
      .then(() => func(null))
      .catch(err => console.log(err))
  }
  // Event hanlder provided by Reanimated that is specifically designed to work with the gesture-handler package
  const eventHandler = useAnimatedGestureHandler({
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
      else if (x.value < 0) runOnJS(less)()

      if (y.value <= -65 && x.value <= 50 && x.value >= -50) runOnJS(remove)()
      else if (y.value >= 65 && x.value <= 50 && x.value >= -50) runOnJS(reset)()

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
    alignItems: 'center',
    maxWidth: responsivePixel(200),
    marginRight: responsivePixel(50),
    backgroundColor: '#FCE3B0', // Color counter sides
    paddingHorizontal: responsivePixel(20),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  counterDisplay: {
    fontSize: responsivePixel(45),
    paddingHorizontal: responsivePixel(35),
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
})

export default CounterDisplay