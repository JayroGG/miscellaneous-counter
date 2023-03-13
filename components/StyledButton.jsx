import React from 'react'
import { Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'

const StyledButton = ({mode, onPress}) => {
  const displayText = [
    mode === 'less' && ' LESS - ',
    mode === 'add' && ' MORE + ',
    mode === 'reset' && 'Reset',
    mode === 'remove' && 'Delete'
  ]
  const displayStyle = [
    mode === 'less' && styles.less,
    mode === 'add' && styles.add,
    mode === 'reset' && styles.reset,
    mode === 'remove' && styles.remove
  ]

  return <TouchableWithoutFeedback onPress={onPress}>
    <Text style={displayStyle}>{displayText}</Text>
  </TouchableWithoutFeedback>
}

const styles = StyleSheet.create({
  add: {
    fontSize: 20,
    marginVertical: 8,
    padding: 15,
    paddingHorizontal: 25,
    color: '#fff',
    backgroundColor: '#1989de',
    alignSelf: 'center',
    borderRadius: 40,
    overflow: 'hidden'
  },
  less: {
    fontSize: 20,
    marginVertical: 8,
    padding: 15,
    paddingHorizontal: 30,
    color: '#fff',
    backgroundColor: '#e84d2f',
    alignSelf: 'center',
    borderRadius: 40,
    overflow: 'hidden'
  },
  reset: {
    fontSize: 30,
    marginVertical: 8,
    padding: 4,
    paddingHorizontal: 145,
    color: '#fff',
    backgroundColor: 'gray',
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden'

  },
  remove: {
    fontSize: 30,
    marginVertical: 8,
    padding: 4,
    paddingHorizontal: 140,
    color: '#fff',
    backgroundColor: '#b92115',
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden'

  }
})
export default StyledButton