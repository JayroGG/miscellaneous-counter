import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import CounterDisplay from './CounterDisplay'
import { responsivePixel } from '../../utils/responsivePixel'
import { updateCounter } from '../../services/updateCounter'
import { counterHandleGesture } from '../../utils/counterHandleGesture'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { animatedMove } from '../../utils/animatedStyles'

const Counter = ({ id, counterName, value } = {}) => {
  const x = useSharedValue(0)
  const y = useSharedValue(0)
  const [count, setCount] = useState(value)
  const [newName, setNewName] = useState(counterName)
  const handleCounterSwipe = counterHandleGesture(x, id, setCount)
  const animatedGesture = animatedMove(x)

  if (count === null) {
    return null
  }

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={handleCounterSwipe}>
        <Animated.View style={[animatedGesture, styles.card]}>
          <TextInput style={styles.title} onChangeText={setNewName} onSubmitEditing={() => updateCounter(id, newName, count)}>
            {counterName.toUpperCase()}
          </TextInput>
          <View>
            <CounterDisplay key={id} id={id} counterName={newName} count={count} setCount={setCount} />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: responsivePixel(10),
    marginBottom: responsivePixel(40),
    minWidth: responsivePixel(340),
    // Shadow Tag
    borderTopLeftRadius: 10,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FBD589', // Background Counter Tag
    borderTopRightRadius: responsivePixel(30),
    borderBottomRightRadius: responsivePixel(30),
    borderTopLeftRadius: responsivePixel(8),
    borderBottomLeftRadius: responsivePixel(8),
    minHeight: 100,
    minWidth: responsivePixel(340),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },
  title: {
    fontWeight: 'bold',
    fontSize: responsivePixel(20),
    paddingVertical: responsivePixel(10),
    paddingHorizontal: responsivePixel(10),
    backgroundColor: '#F8B225', // 'rgba(0, 0, 0, .8)' Background title
    color: '#fff',
    minWidth: responsivePixel(130),
    maxWidth: responsivePixel(130),
    minHeight: 100,
    textAlign: 'center',
    borderWidth: .5,
    borderTopLeftRadius: responsivePixel(6),
    borderBottomLeftRadius: responsivePixel(6),
    borderBottomRightRadius: responsivePixel(30),
    // borderTopRightRadius: responsivePixel(30)
  },
})

export default Counter