import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Link } from 'react-router-native'
import Constants from 'expo-constants'
import Form from '../components/Form'

const New = () => {
  return <View style={styles.container}>
    <Link to='/' underlayColor='transparent'>
      <Text>Back Home</Text>
    </Link>
    <Form />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight + 10,
    margin: 20,
  },
})

export default New