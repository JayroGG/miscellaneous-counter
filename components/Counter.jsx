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
      await AsyncStorage.setItem(JSON.stringify(id), JSON.stringify({ "counterName": newName, "count": count }))
      navigate('/')
    } catch (error) {
      console.error({ message: error })
    }
  }

  return (<View style={styles.container}>
    <View style={styles.titleContainer}>
      <TextInput style={styles.title} onChangeText={setNewName} onSubmitEditing={handleSubmit}>{counterName.toUpperCase()}</TextInput>
    </View>
    <View style={styles.counterContainer}>
      <CounterDisplay key={newName} id={id} counterName={newName} count={count} func={setCount} />
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    minHeight: 370,
    minWidth: 421,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, .8)',
    color: '#fff',
    borderRadius: 4,
    minWidth: 150,
    textAlign: 'center'
  },
  counterContainer: {
    flex: 1,
    justifyContent: 'center'
  },
})

export default Counter