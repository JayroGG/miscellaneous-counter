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
      <Text style={styles.new}> + </Text>
    </Link>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    backgroundColor: 'rgba(193, 201, 205, 0.7)',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 30,
  },
  new: {
    fontSize: 60,
    marginBottom: 8,
    padding: 4,
    alignSelf: 'center',
    color: '#fff',
    borderRadius: 4,
    overflow: 'hidden'
  },
})

export default CounterList