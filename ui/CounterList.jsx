import React from 'react'
import Counter from '../components/Counter/Counter'
import withGestureList from '../HOCs/withGestureList'

const Counters = ({ id, name, count}) => {

  return (
    <Counter
      key={id}
      id={id}
      counterName={name}
      value={count}
    />
  )
}

const CounterList = withGestureList(Counters, 'TallyMate')
export default CounterList
