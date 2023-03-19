import React from 'react'
import { StyleSheet, View } from 'react-native'
import Constants from 'expo-constants'
import Form from '../components/Form/Form'

const New = () => {
  return <View style={styles.container}>
    <Form />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5E97FF',
    paddingTop: Constants.statusBarHeight + 10,
  },
})

export default New