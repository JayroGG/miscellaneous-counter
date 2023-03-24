import React, { useState, useEffect } from 'react'
import { getCounters } from '../services/getCounters'

export const useCounters = (setNewCounter, newCounter) => {
  const [data, setData] = useState([])
  useEffect(() => {
    getCounters().then(data => setData(data))
    setNewCounter(false)
  }, [setData, newCounter, setNewCounter])
  return data
}
