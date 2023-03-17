import AsyncStorage from '@react-native-async-storage/async-storage'

export const setCounter = async (name, value) => {
  // Cleanign the string from empty spaces
  let counterName = name.trim()
  const trimedVal = value.trim()
  // Regular expresion that takes out all non digit characters
  let val = trimedVal.replace(/\D/g, "")
  if (val === '' || value === null) val = "0"
  try {
    // Count the number of items in the storage in order to give a unique key
    const key = await (await AsyncStorage.getAllKeys()).length
    console.log(key)
    // if empty gets asiganted a value for key and val
    if (counterName === '') {
      counterName = `Counter${key}`
    }
    await AsyncStorage.setItem(JSON.stringify(key), JSON.stringify({ "counterName": counterName, "count": val }))
  } catch (error) {
    console.error({ message: error })
  }
}