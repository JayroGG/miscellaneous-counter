import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const CounterDisplay = ({ count }) => {
  
  return <View style={styles.countContainer}>
        <Text style={styles.counterDisplay}>{count}</Text>
  </View>
}

const styles = StyleSheet.create({
  countContainer: {
    paddingBottom: 10
  },
  counterDisplay: {
    paddingHorizontal: 20,
    color: '#fff',
    backgroundColor: '#004972',
    fontSize: 150,
    borderRadius: 40
  }
})

export default CounterDisplay