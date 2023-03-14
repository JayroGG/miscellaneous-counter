import { StyleSheet, View } from 'react-native'
import CounterList from '../components/CounterList'
import Constants from 'expo-constants'

export default function Main() {

  return (
    <View style={styles.container}>
      <CounterList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight + 10,
  },
})
