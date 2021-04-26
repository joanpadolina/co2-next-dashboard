import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

export default function HistoryCharge() {
  const userChargeHistory = useSelector((state) => state.user.historyCharge)
  const [lastCharge, setLastCharge] = useState({})

  useEffect(() => {
    function getLatestCharge() {
      const lastItem = userChargeHistory[userChargeHistory.length - 1]
      setLastCharge(lastItem)
    }

    getLatestCharge()
  }, [lastCharge, userChargeHistory])

  return (
    <article className='recent-charge'>
      <h2 className='recent-charge__title'>Your latest charge</h2>
      <table>
        <thead>
          <td>date</td>
          <td>savings</td>
          <td>CO2 saved</td>
        </thead>
        <tbody>
          <tr>
            <td>
              {lastCharge.start} - {lastCharge.end}
            </td>
            <td> {lastCharge.savingsInPercentage}</td>
            <td> {lastCharge.savedCarbon}kg</td>
          </tr>
        </tbody>
      </table>
    </article>
  )
}
