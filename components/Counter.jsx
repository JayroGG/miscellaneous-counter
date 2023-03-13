import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import CounterDisplay from './CounterDisplay'
import CounterBotom from './CounterBottom'

const Counter = ({ counterName, value = 0 } = {}) => {
  const [count, setCount] = useState(JSON.parse(value))

  if (count === null) {
    return null
  }

  return (<View style={styles.container}>
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text style={styles.title}>{counterName.toUpperCase()}</Text>
    </View>
    <CounterDisplay counterName={counterName} count={count} func={setCount}/>
    <CounterBotom counterName={counterName} func={setCount}/>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20
  },
  title: {
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#09848c',
    color: '#fff',
    borderRadius: 4
  }
})

export default Counter