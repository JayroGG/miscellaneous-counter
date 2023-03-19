import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { Link } from 'react-router-native'
import { useCounters } from '../hooks/useCounters'
import { animatedMove } from '../utils/animatedStyles'
import { handleGesture } from '../utils/handleGesture'

const withGestureList = (Component, listTitle, direction) => {
  const WrappedComponent = () => {
    const x = useSharedValue(0)
    const y = useSharedValue(0)
    const animatedGesture = animatedMove(x, y)
    const counters = useCounters()
    const handleSwipe = handleGesture(x, y)

    const flexStyles = [
      styles.container,
      direction === 'row' && styles.row,
      direction === 'column' && styles.column,
    ]
    return (
      <View style={flexStyles}>
        <Text style={styles.title}>{listTitle}</Text>
        <Component
          counters={counters}
          animatedGesture={animatedGesture}
          handleSwipe={handleSwipe} />
        <PanGestureHandler onGestureEvent={handleSwipe}>
          <Animated.View style={animatedGesture}>
            <Link to='/new' underlayColor='transparent'>
              <Text style={styles.new}> + </Text>
            </Link>
          </Animated.View>
        </PanGestureHandler>
      </View>)
  }
  return (
    WrappedComponent
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
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
export default withGestureList
