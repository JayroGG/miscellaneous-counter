import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import CounterDisplay from './CounterDisplay'

const Counter = ({ counterName, value } = {}) => {
  const [count, setCount] = useState(JSON.parse(value))

  if (count === null) {
    return null
  }

  return (<View style={styles.container}>
    <View style={styles.titleContainer}>
      <TextInput style={styles.title}>{counterName.toUpperCase()}</TextInput>
    </View>
    <View style={styles.counterContainer}>
      <CounterDisplay counterName={counterName} count={count} func={setCount} />
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