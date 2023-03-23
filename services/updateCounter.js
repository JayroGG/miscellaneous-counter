import AsyncStorage from '@react-native-async-storage/async-storage'

export const updateCounter = async (id, newName, count) => {
  try {
    await AsyncStorage.setItem(id, JSON.stringify({ "counterName": newName, "count": count }))
  } catch (error) {
    console.error({ message: error })
  }
}