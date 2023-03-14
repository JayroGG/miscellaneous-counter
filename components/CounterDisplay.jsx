import React from 'react'
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
  const x = useSharedValue(startingPosition)
  const y = useSharedValue(startingPosition)

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
    Vibration.vibrate(10)
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
      } else if (x.value < -100) {
        runOnJS(less)()
      }
    },
    onEnd: (event, ctx) => {
      x.value = withSpring(startingPosition)
      y.value = withSpring(startingPosition)
      runOnJS(Vibration.vibrate)(10)
      console.log(x.value)
      console.log(y.value)
      if (x.value > 0) {
        runOnJS(add)()
      } else if (x.value < 0) {
        runOnJS(less)()
      }
      if (y.value < -100) {
        runOnJS(reset)()
      }
      if (y.value > 100) {
        runOnJS(remove)()
      }
    }
  })
  return <View style={styles.countContainer}>
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={[animatedStyles, styles.animatedContainer]}>
        <Text style={styles.counterDisplay}>{count}</Text>
      </Animated.View>
    </PanGestureHandler>
  </View>
}

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    alignItems: 'center'
  },
  countContainer: {
    paddingBottom: 10
  },
  counterDisplay: {
    paddingHorizontal: 20,
    color: '#fff',
    backgroundColor: '#0049FF',
    fontSize: 100,
    borderRadius: 40
  }
})

export default CounterDisplay