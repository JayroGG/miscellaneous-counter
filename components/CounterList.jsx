import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import Counter from './Counter'
import { getCounters } from '../services/getCounters'
import { setCounter } from '../services/setCounter'
import { Link } from 'react-router-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { useNavigate } from 'react-router-native'
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated'


const CounterList = () => {
  const [counters, setCounters] = useState([])
  const navigate = useNavigate()
  const x = useSharedValue(0)
  const y = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
      ]
    }
  })

  useEffect(() => {
    getCounters().then(data => setCounters(data))
  }, [setCounters])

  const handleGesture = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = x.value
      ctx.startY = y.value
    },
    onActive: (event, ctx) => {
      x.value = event.translationX
      y.value = event.translationY

      if (y.value < -100) y.value = -100
      if (x.value > 100) x.value = 100
      if (x.value < -100) x.value = -100
      
    },
    onEnd: (event, ctx) => {
      if (y.value <= -100) {
        runOnJS(setCounter)()
        runOnJS(navigate)('/')
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
  return (<View style={styles.container}>
    <Text style={styles.title}>Miscellaneous List</Text>
    <FlatList
      showsVerticalScrollIndicator={false}
      data={counters}
      renderItem={({ item: counter }) => {
        const id = counter[0]
        const value = JSON.parse(counter[1])
        const name = value.counterName
        const count = value.count
        return (
          <Counter
            key={id}
            id={id}
            counterName={name}
            value={count}
          />
        )
      }}
    />
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View style={animatedStyles}>
        <Link to='/new' underlayColor='transparent'>
          <Text style={styles.new}> + </Text>
        </Link>
      </Animated.View>
    </PanGestureHandler>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 48,
    color: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingTop: 11,
    marginBottom: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  new: {
    fontSize: 60,
    marginBottom: 8,
    padding: 4,
    alignSelf: 'center',
    color: '#fff',
    borderRadius: 4,
    overflow: 'hidden'
  },
})

export default CounterList