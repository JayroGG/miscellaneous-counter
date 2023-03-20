import React from 'react'
import { FlatList, View } from 'react-native'
import Counter from '../components/Counter/Counter'
import withGestureList from '../HOCs/withGestureList'

const CounterList = ({ counters }) => {

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={counters}
      renderItem={({ item: counter }) => {
        const id = counter[0]
        const value = JSON.parse(counter[1])
        const name = value.counterName
        const count = value.count
        return (
          <Counter
            key={id}
            id={id}
            counterName={name}
            value={count}
          />
        )
      }}
    />
  )
}

const GestureList = withGestureList(CounterList, 'Miscellaneous List')
export default GestureList
