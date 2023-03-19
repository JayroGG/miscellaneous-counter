import React, { useState, useEffect } from 'react'
import { getCounters } from '../services/getCounters'

export const useCounters = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    getCounters().then(data => setData(data))
  }, [setData])
  return data
}
