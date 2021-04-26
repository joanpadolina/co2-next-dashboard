import React, { useState, createContext } from 'react'

export const ChargingContext = createContext()

export function ChargingProvider(props) {
  const [charging, setCharging] = useState([
    {
      date: '2021-03-11',
      start: '12:00',
      end: '20:00',
      duration: '08:00',
      savingsInPercentage: '10%',
      savedCarbon: 25,
      totalCarbon: 50,
      totalSavedCarbon: 25
    }
  ])
  return (
    <ChargingContext.Provider value={[charging, setCharging]}>
      {props.children}
    </ChargingContext.Provider>
  )
}
