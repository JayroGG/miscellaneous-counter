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
import { counterDisplayHandleGesture } from '../../utils/counterDisplayHandleGesture'

const CounterDisplay = ({ id, counterName, setCount, count }) => {
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

  // Event hanlder provided by Reanimated that is specifically designed to work with the gesture-handler package
  const eventHandler =  counterDisplayHandleGesture(x, y, startingPosition, id, counterName, setCount, count, setReseting)
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
    marginRight: responsivePixel(45),
    backgroundColor: '#FCE3B0', // Color counter sides
    paddingHorizontal: responsivePixel(15),
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
    textAlign: 'center',
    fontSize: responsivePixel(45),
    minWidth: responsivePixel(110),
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