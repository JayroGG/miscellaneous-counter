import { updateCounter } from "../services/updateCounter"
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { responsivePixel } from "../utils/responsivePixel"


export const display = (id, counterName, doubleTapped, setDoubleTapped, count, setCount, backgroundColor) => {

  const handleSubmiting = () => {
    setDoubleTapped(false)
    let trimedVal
    // Verifiying data and cleaning the string from empty spaces

    if (count === undefined) {
      trimedVal = ''
    } else {
      trimedVal = count.trim()
    }

    // Regular expresion that takes out all non digit characters and leadding zeros
    let filteredVal = trimedVal.replace(/^0+/, "").replace(/\D/g, "")
    if (filteredVal === '') filteredVal = "0"
    setCount(JSON.parse(filteredVal))
    updateCounter(id, counterName, filteredVal)
  }
  return doubleTapped
    ? <TextInput style={[styles.counterDisplay, { backgroundColor: backgroundColor }]} onChangeText={setCount} onSubmitEditing={handleSubmiting}>{count}</TextInput>
    : <Text style={[styles.counterDisplay, { backgroundColor: backgroundColor }]}>{count}</Text>
}

const styles = StyleSheet.create({
  counterDisplay: {
    textAlign: 'center',
    fontSize: responsivePixel(45),
    minWidth: responsivePixel(110),
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
})