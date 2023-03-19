import React from 'react'
import { Text, View, StyleSheet, FlatList, Vibration } from 'react-native'
import Counter from '../components/Counter/Counter'
import { Link } from 'react-router-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { useCounters } from '../hooks/useCounters'
import { animatedMove } from '../utils/animatedStyles'
import { handleGesture } from '../utils/handleGesture'


const CounterList = () => {
  const x = useSharedValue(0)
  const y = useSharedValue(0)

  const animatedGesture = animatedMove(x, y)

  const counters = useCounters()

  console.log(counters)
  const handleSwipe = handleGesture(x, y)

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
    <PanGestureHandler onGestureEvent={handleSwipe}>
      <Animated.View style={animatedGesture}>
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
