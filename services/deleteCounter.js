import AsyncStorage from '@react-native-async-storage/async-storage'
import { Vibration } from 'react-native'

export const deleteCounter = (id, setCount) => {
  Vibration.vibrate(10)
  AsyncStorage.removeItem(id)
    .then(() => setCount(null))
    .catch(err => console.log(err))
}