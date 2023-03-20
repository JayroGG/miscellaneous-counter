import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import CounterDisplay from './CounterDisplay'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigate } from 'react-router-native'

const Counter = ({ id, counterName, value } = {}) => {
  const [count, setCount] = useState(JSON.parse(value))
  const [newName, setNewName] = useState(counterName)
  const navigate = useNavigate()
  if (count === null) {
    return null
  }

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem(id, JSON.stringify({ "counterName": newName, "count": count }))
      navigate('/')
    } catch (error) {
      console.error({ message: error })
    }
  }

  return (<View style={styles.container}>
    <View style={styles.displayContainer}>
      <TextInput style={styles.title} onChangeText={setNewName} onSubmitEditing={handleSubmit}>
        {counterName.toUpperCase()}
      </TextInput>
      <View style={{ marginBottom: 10 }}>
        <CounterDisplay key={newName} id={id} counterName={newName} count={count} func={setCount} />
      </View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    minHeight: 130,
    minWidth: 421,
  },
  displayContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, .8)',
    color: '#fff',
    minWidth: 140,
    textAlign: 'center',
    // borderTopLeftRadius: 60,
    borderBottomRightRadius: 30,
    // borderTopRightRadius: 30
  },
})

export default Counter