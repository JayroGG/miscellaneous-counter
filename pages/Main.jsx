import { StyleSheet, View } from 'react-native'
import CounterList from '../ui/CounterList'
import Constants from 'expo-constants'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function Main() {

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CounterList />
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  animatedContainer: {
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'black', // 5E97FF80
    paddingTop: Constants.statusBarHeight,
  },
})
