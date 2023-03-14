import React, { useState } from 'react'
import { Text, View, StyleSheet, Vibration } from 'react-native'
import CounterDisplay from './CounterDisplay'
import CounterBotom from './CounterBottom'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  runOnJS,
  withSequence
} from 'react-native-reanimated'

const Counter = ({ counterName = 'Unknow', value = '0' } = {}) => {
  const [count, setCount] = useState(JSON.parse(value))
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
      .then(setCount(newCount))
      .catch(err => console.log(err))
  }
  const less = () => {
    Vibration.vibrate(10)
    const newCount = count === 0 ? 0 : count - 1
    AsyncStorage.setItem(counterName, JSON.stringify(newCount))
      .then(setCount(newCount))
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
    },
    onEnd: (event, ctx) => {
      x.value = withSpring(startingPosition)
      y.value = withSpring(startingPosition)
      runOnJS(Vibration.vibrate)(10)
      console.log(x.value)
      console.log(y.value)
      if (x.value > 0) {
        runOnJS(add)()
      } else if ( x.value < 0) {
        runOnJS(less)()
      }
    }
  })
  

  if (count === null) {
    return null
  }

  return (<GestureHandlerRootView style={styles.container}>
    <View style={{ alignItems: 'center', marginVertical: 20 }}>
      <Text style={styles.title}>{counterName.toUpperCase()}</Text>
    </View>

    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={[animatedStyles, styles.animatedContainer]}>
        <CounterDisplay count={count} />
      </Animated.View>
    </PanGestureHandler>
    <CounterBotom counterName={counterName} func={setCount} />
  </GestureHandlerRootView>

  )
}

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1, 
    alignItems: 'center'
  },
  container: {
    paddingBottom: 20
  },
  title: {
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#09848c',
    color: '#fff',
    borderRadius: 4
  }
})

export default Counter