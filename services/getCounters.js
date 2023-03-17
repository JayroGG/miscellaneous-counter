import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getCounters() {
  const keys = await AsyncStorage.getAllKeys()
  const filteredKeys = keys.filter(key => key !== "ItemCount")
  const dataFromStorage = await AsyncStorage.multiGet(filteredKeys)
  return dataFromStorage
}
