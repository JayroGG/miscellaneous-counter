import React from 'react'
import StyledButton from './StyledButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Vibration } from 'react-native'

const CounterBotom = ({ func, counterName}) => {
  const reset = () => {
    Vibration.vibrate(10)
    AsyncStorage.setItem(counterName, JSON.stringify(0))
      .then(func(0))
      .catch(err => console.log(err))
  }
  const remove = () => {
    Vibration.vibrate(10)
    AsyncStorage.removeItem(counterName)
      .then(() => func(null))
      .catch(err => console.log(err))
  }

  return <>
    <StyledButton mode='reset' onPress={reset} />
    <StyledButton mode='remove' onPress={remove} />
  </>
}

export default CounterBotom