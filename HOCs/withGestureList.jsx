import React from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { useCounters } from '../hooks/useCounters'
import { animatedMove } from '../utils/animatedStyles'
import { handleGesture } from '../utils/handleGesture'

const withGestureList = (Component) => {
  const WrappedComponent = () => {
    const x = useSharedValue(0)
    const y = useSharedValue(0)
    const animatedGesture = animatedMove(x, y)
    const counters = useCounters()
    const handleSwipe = handleGesture(x, y)
    
    return <Component
      counters={counters}
      animatedGesture={animatedGesture}
      handleSwipe={handleSwipe} />
  }
  return (
    WrappedComponent
  )
}

export default withGestureList
