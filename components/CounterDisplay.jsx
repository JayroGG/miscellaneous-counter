import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import StyledButton from './StyledButton'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CounterDisplay = ({ counterName, func, count}) => {
  const add = () => {
    const newCount = count + 1
    AsyncStorage.setItem(counterName, JSON.stringify(newCount))
      .then(func(newCount))
      .catch(err => console.log(err))
  }
  const less = () => {
    const newCount = count === 0 ? 0 : count - 1
    AsyncStorage.setItem(counterName, JSON.stringify(newCount))
      .then(func(newCount))
      .catch(err => console.log(err))
  }
  return <View style={styles.countContainer}>
    <StyledButton mode='less' onPress={less} />
    <Text style={styles.counterDisplay}>{count}</Text>
    <StyledButton mode='add' onPress={add} />
  </View>
}

const styles = StyleSheet.create({
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  counterDisplay: {
    fontSize: 50
  }
})

export default CounterDisplay