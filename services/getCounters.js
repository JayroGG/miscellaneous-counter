import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getCounters() {
  const keys = await AsyncStorage.getAllKeys()
  const dataFromStorage = await AsyncStorage.multiGet(keys)
  return dataFromStorage
}
