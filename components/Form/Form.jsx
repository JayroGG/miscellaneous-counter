import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Link } from 'react-router-native'
import { setCounter } from '../../services/setCounter'

const Form = () => {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    
    // Saving in the storage
    setCounter(name, value)
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
      maxLength={7}
    />
    <View style={styles.options}>
      <Link to='/' underlayColor='transparent' style={styles.link}>
        <Text style={styles.text}>Back</Text>
      </Link>
      <View style={styles.save} >
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
    minHeight: 100,
    minWidth: 300,
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  options: {
    flexDirection: 'row',
  },
  link: {
    backgroundColor: '#E55633',
    padding: 10,
    marginRight: 5,
    minWidth: 100,
    borderRadius: 10
  },
  save: {
    backgroundColor: '#5C9DC0',
    justifyContent: 'center',
    padding: 10,
    marginLeft: 5,
    minWidth: 100,
    borderRadius: 10
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