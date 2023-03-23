import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableWithoutFeedback, Vibration } from 'react-native'
import CounterDisplay from './CounterDisplay'
import { responsivePixel } from '../../utils/responsivePixel'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import { updateCounter } from '../../services/updateCounter'
import { deleteCounter } from '../../services/deleteCounter'

const Counter = ({ id, counterName, value } = {}) => {
  const [count, setCount] = useState(value)
  const [newName, setNewName] = useState(counterName)
  const [deleting, setDeleting] = useState(false)

  if (count === null) {
    return null
  }

  const longPressGesture = Gesture.LongPress().onEnd((e, success) => {
    if (success && e.duration >= 300) {
      runOnJS(setDeleting)(true)
    }
  })

  return (<View style={styles.container}>
    {deleting &&
      <TouchableWithoutFeedback onPress={() => deleteCounter(id, setCount)}>
        <Text style={{ fontSize: 30, backgroundColor: '#F56960', borderRadius: 10, textAlign: 'center' }}>X</Text>
      </TouchableWithoutFeedback>
    }
    <GestureDetector gesture={longPressGesture}>
      <View style={styles.card}>
        <TextInput style={styles.title} onChangeText={setNewName} onSubmitEditing={() => updateCounter(id, newName, count)}>
          {counterName.toUpperCase()}
        </TextInput>
        <View >
          <CounterDisplay key={id} id={id} counterName={newName} count={count} func={setCount} />
        </View>
      </View>
    </GestureDetector>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: responsivePixel(10),
    marginBottom: responsivePixel(30),
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