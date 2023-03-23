import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
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
const styles = StyleSheet.create({
  componentBackGround: {
    backgroundColor: '#FEF1D8',
    borderRadius: 20,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
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
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 60,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    backgroundColor: '#F9B939'
  },
  new: {
    fontSize: 60,
    marginBottom: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
    color: '#fff',
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#F8B225'
  }
})
export default withGestureList
