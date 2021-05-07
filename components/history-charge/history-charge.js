import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

export default function HistoryCharge() {
  const chargingSessions = useSelector((state) => state.store.chargingSession)
  const router = useRouter()
  const path = router.pathname

  function chargeHighlightLength() {
    if (path === '/') {
      return Math.max(chargingSessions.length - 3, 0)
    } else {
      return ''
    }
  }

  function stylingConditions() {
    if (path === '/') {
      return 'history-charge__body-highlight'
    } else {
      return ''
    }
  }
  return (
    <>
      <table className='history-charge'>
        {chargingSessions
          .slice(chargeHighlightLength())
          .map((charging, index) => (
            <tbody
              key={index}
              className={`history-charge__body ${stylingConditions()}`}
            >
              <tr className='history-charge__heading-wrapper'>
                <th className='history-charge__heading'>date</th>
                <th className='history-charge__heading'>savings</th>
                <th className='history-charge__heading'>CO2 saved</th>
              </tr>
              <tr className='history-charge__row'>
                <td className='history-charge__value'>
                  <span className='history-charge__value-date'>
                    {charging.date}{' '}
                  </span>
                  <span>
                    {charging.start} - {charging.end}
                  </span>
                </td>
                <td className='history-charge__value'>
                  {' '}
                  {charging.savingsInPercentage}
                </td>
                <td className='history-charge__value'>
                  {' '}
                  {charging.savedCarbon} kg
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </>
  )
}

