import AsyncStorage from '@react-native-async-storage/async-storage'

export const setCounter = async (name, value) => {
  let counterName
  let trimedVal
  // Verifiying data and cleaning the string from empty spaces
  if (name === undefined) {
    counterName = ''
  } else {
    counterName = name.trim()
  }
  if (value === undefined) {
    trimedVal = ''
  } else {
    trimedVal = value.trim()
  }

  // Regular expresion that takes out all non digit characters and leadding zeros
  let filteredVal = trimedVal.replace(/^0+/, "").replace(/\D/g, "")
  if (filteredVal === '') filteredVal = "0"
  try {
    // Count the number of items in the storage in order to give a unique key
    const key = await (await AsyncStorage.getAllKeys()).length
    console.log(key)
    // if empty gets asiganted a value for key and val
    if (counterName === '') {
      counterName = `Counter${key}`
    }
    await AsyncStorage.setItem(JSON.stringify(key), JSON.stringify({ "counterName": counterName, "count": filteredVal }))
  } catch (error) {
    console.error({ message: error })
  }
}
