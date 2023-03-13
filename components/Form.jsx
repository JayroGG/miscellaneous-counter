import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigate } from 'react-router-native'

const Form = () => {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    console.log({ name, value })
    try {
      await AsyncStorage.setItem(name, value)
      navigate('/')
    } catch (error) {
      console.error({ message: error })
    }
  }

  return <View style={styles.container}>
    <Text>Name</Text>
    <TextInput
      style={styles.input}
      onChangeText={setName}
      placeholder='Name the thing'
      value={name}
    />
    <Text>How Many</Text>
    <TextInput
      style={styles.input}
      onChangeText={setValue}
      placeholder='Initial Count'
      keyboardType='numeric'
      value={value.toString()}
    />
    <Button title='Register' onPress={handleSubmit} />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
})

export default Form