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
  const startingPosition = 0
  const [deleting, setDeleting] = useState(false)
  const [fastIncrement, setFastIncrement] = useState(false)
  const [fastDecrement, setFastDecrement] = useState(false)
  const [reseting, setReseting] = useState(false)
  const x = useSharedValue(startingPosition)
  const y = useSharedValue(startingPosition)
  let backgroundColor = 'rgba(55, 60, 62, 0.7)'
  
  deleting ? backgroundColor = 'red'
    : fastIncrement ? backgroundColor = '#5CB8C0'
    : fastDecrement ? backgroundColor = '#A25CC0'
    : reseting ? backgroundColor = 'gray'
    : console.log('noactions')

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
      ]
    }
  })
  const add = () => {
    Vibration.vibrate(10)
    const newCount = count + 1
    AsyncStorage.setItem(counterName, JSON.stringify(newCount))
      .then(func(newCount))
      .catch(err => console.log(err))
  }
  const less = () => {
    Vibration.vibrate(10)
    const newCount = count === 0 ? 0 : count - 1
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
  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = x.value
      ctx.startY = y.value
    },
    onActive: (event, ctx) => {
      x.value = event.translationX
      y.value = event.translationY
      if (x.value > 100) {
        runOnJS(add)()
        runOnJS(setFastIncrement)(true)
      } else {
        runOnJS(setFastIncrement)(false)
      }
      if (x.value < -100) { 
        runOnJS(setFastDecrement)(true)
        runOnJS(less)()
      } else {
        runOnJS(setFastDecrement)(false)
      }
      if (y.value > 150) {
        runOnJS(setDeleting)(true)
      } else {
        runOnJS(setDeleting)(false)
      } 
      if (y.value < -100) {
        runOnJS(setReseting)(true)
      } else {
        runOnJS(setReseting)(false)
      } 
    },
    onEnd: (event, ctx) => {
      x.value > 0 ? runOnJS(add)() 
      : x.value < 0 ? runOnJS(less)()
      : console.log('No horizontal actions')

      y.value < -100 ? runOnJS(reset)()
      : y.value > 150 ? runOnJS(remove)()
      : console.log('No vertical actions')
      runOnJS(setFastIncrement)(false)
      runOnJS(setFastDecrement)(false)
      runOnJS(setReseting)(false)
      x.value = withSpring(startingPosition)
      y.value = withSpring(startingPosition)
    }
  })
  return <View >
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