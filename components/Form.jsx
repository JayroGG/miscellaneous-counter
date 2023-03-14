import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native'
import { Link } from 'react-router-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigate } from 'react-router-native'

const Form = () => {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    let key = name.trim()
    if (key === '') key = 'Unknown'
    let val = value.trim()
    if (val === '') val = '0'

    console.log({ key, val })
    try {
      await AsyncStorage.setItem(key, val)
      navigate('/')
    } catch (error) {
      console.error({ message: error })
    }
  }

  return <View style={styles.container}>
    <Text style={styles.labelText}>Name</Text>
    <TextInput
      style={styles.input}
      onChangeText={setName}
      placeholder='Name the thing'
      value={name}
    />
    <Text style={styles.labelText}>How Many</Text>
    <TextInput
      style={styles.input}
      onChangeText={setValue}
      placeholder='Initial Count'
      keyboardType='numeric'
      value={value.toString()}
    />
    <View style={styles.options}>
      <Link to='/' underlayColor='transparent' style={{backgroundColor: '#E55633', padding: 10, marginRight: 5, minWidth: 100, borderRadius: 10}}>
        <Text style={styles.text}>Back</Text>
      </Link>
      <View style={{backgroundColor: '#5C9DC0', justifyContent: 'center', padding: 10, marginLeft: 5, minWidth: 100, borderRadius: 10}} >
         <TouchableWithoutFeedback onPress={handleSubmit}>
        <Text style={styles.text}>Save</Text>
      </TouchableWithoutFeedback>
      </View>
    </View>

  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 30,
    marginBottom: 100,
  },
  options: {
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center', 
    fontSize: 30, 
    color: '#fff',
  },
  labelText: {
    textAlign: 'center', 
    fontSize: 30, 
    marginBottom: 30,
    color: '#fff',
  },
})

export default Form