import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { useCounters } from '../hooks/useCounters'
import { animatedMove } from '../utils/animatedStyles'
import { listHandleGesture } from '../utils/listHandleGesture'
import { styles } from './withGestureListStyles'

const withGestureList = (Component, listTitle, direction) => {
  const WrappedComponent = () => {
    const [newCounter, setNewCounter] = useState(false)
    const x = useSharedValue(0)
    const y = useSharedValue(0)
    const animatedGesture = animatedMove(x, y)
    const counters = useCounters(setNewCounter, newCounter)
    const handleSwipe = listHandleGesture(x, y, setNewCounter)
    const flexStyles = [
      styles.container,
      { backgroundColor: '#FEF1D8', borderRadius: 200 },
      direction === 'row' && styles.row,
      direction === 'column' && styles.column,
    ]

    return (
      <View style={flexStyles}>
        <Text style={styles.title}>{listTitle}</Text>
        <FlatList
          style={styles.componentBackGround}
          showsVerticalScrollIndicator={false}
          data={counters}
          renderItem={({ item: counter }) => {
            const id = counter[0]
            const value = JSON.parse(counter[1])
            const name = value.counterName
            const count = JSON.parse(value.count)
            return (
              <Component
                id={id}
                name={name}
                count={count}
              />
            )
          }}
        />
        <PanGestureHandler onGestureEvent={handleSwipe}>
          <Animated.View style={animatedGesture}>
            <Text style={styles.new}> + </Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    )
  }
  return WrappedComponent

}

export default withGestureList
