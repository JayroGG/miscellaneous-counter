import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  componentBackGround: {
    backgroundColor: '#FEF1D8',
    borderRadius: 20,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  title: {
    textAlign: 'center',
    fontSize: 48,
    color: '#F5F5F5',
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 60,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    backgroundColor: '#F9B939'
  },
  new: {
    fontSize: 60,
    marginBottom: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
    color: '#fff',
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#F8B225'
  }
})
