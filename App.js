import Main from './pages/Main'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Main />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F0F5', // '#5E97FF80' '#078B9C' #1B7288
    paddingTop: Constants.statusBarHeight,
  },
})
