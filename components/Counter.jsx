import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import CounterDisplay from './CounterDisplay'

const Counter = ({ counterName = 'Unknow', value = '0' } = {}) => {
  const [count, setCount] = useState(JSON.parse(value))

  if (count === null) {
    return null
  }

  return (<View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{counterName.toUpperCase()}</Text>
    </View>
    <View style={styles.counterContainer}>
      <CounterDisplay counterName={counterName} count={count} func={setCount} />
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    fex: 1, 
    padding: 20, 
    minHeight: 400,
  },
  titleContainer: { 
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#09848c',
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