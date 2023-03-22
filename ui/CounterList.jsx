import React from 'react'
import { FlatList } from 'react-native'
import Counter from '../components/Counter/Counter'
import withGestureList from '../HOCs/withGestureList'

const CounterList = ({ counters, style }) => {

  return (
    <FlatList
      style={style}
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

const GestureList = withGestureList(CounterList, 'TallyMate')
export default GestureList
