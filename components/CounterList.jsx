import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import Counter from './Counter'
import { getCounters } from '../services/getCounters'
import { Link } from 'react-router-native'

const CounterList = () => {
  const [counters, setCounters] = useState([])

  useEffect(() => {
    getCounters().then(data => setCounters(data))
  }, [setCounters])

  console.log(counters)

  return (<View style={styles.container}>
    <Text style={styles.title}>Miscellaneous List</Text>
    <FlatList
      showsVerticalScrollIndicator={false}
      data={counters}
      ItemSeparatorComponent={() => <Text> </Text>}
      renderItem={({ item: counter }) => {
        const name = counter[0]
        return (
          <Counter
            key={name}
            counterName={name}
            value={counter[1]}
          />
        )
      }}
    />
    <Link to='/new' underlayColor='transparent'>
      <Text style={styles.new}> Add + </Text>
    </Link>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 40
  },
  new: {
    fontSize: 40,
    marginVertical: 8,
    padding: 4,
    color: '#fff',
    backgroundColor: '#0366d6',
    alignSelf: 'center',
    borderRadius: 4,
    overflow: 'hidden'
  },
})

export default CounterList