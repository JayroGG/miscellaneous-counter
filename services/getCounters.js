import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getCounters() {
  const keys = await AsyncStorage.getAllKeys()
  const dataFromStorage = await AsyncStorage.multiGet(keys)
  const filteredData = dataFromStorage.filter(([key]) => key !== '__react_native_storage_test')

  return filteredData
}
