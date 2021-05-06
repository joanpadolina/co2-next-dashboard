import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function HistoryCharge() {
  const chargingSessions = useSelector((state) => state.store.chargingSession)
  const [sessionEdit, setSessionEdit] = useState(false)
  const [currentDate, setCurrentDate] = useState()
  const router = useRouter()
  const path = router.pathname
  useEffect(() => {}, [sessionEdit])
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

  function changeDate(e) {
    return setCurrentDate(e.target.value)
  }

  const EditModeSession = () => {
    return (
      <form>
        <label
          className='charge-input-modal__label a11y-sr-only'
          aria-label='date'
          htmlFor='date'
        >
          date
        </label>

        <input
          className='charge-input-modal__date'
          id='date'
          type='date'
          value={currentDate}
          onChange={(e) => changeDate(e)}
        ></input>

        <div className='charge-input-modal__amount-wrapper'>
          <label className='charge-input-modal__label' htmlFor='start'>
            start
            <input
              className='charge-input-modal__time charge-input-modal__border--default'
              id='start'
              type='time'
              min='00:00'
              max='23:59'
            ></input>
          </label>

          <label className='charge-input-modal__label' htmlFor='end'>
            end
            <input
              className='charge-input-modal__time charge-input-modal__border--default'
              id='end'
              type='time'
              min='00:00'
              max='23:59'
            ></input>
          </label>
        </div>

        <div className='charge-input-modal__value-wrapper'>
          <label
            htmlFor='charge-value'
            className='charge-input-modal__charge-label'
          >
            Charging amount
          </label>

          <div className='charge-input-modal__amount-charge'>
            <input
              id='charge-value'
              type='number'
              className='charge-input-modal__amount charge-input-modal__border--default'
            ></input>

            <div className='charge-input-modal__toggle'>
              <input
                type='radio'
                className='charge-input-modal__radio'
                id='km'
                name='amount'
                value='km'
                defaultChecked
              />
              <label
                htmlFor='km'
                className='charge-input-modal__radio-label'
                aria-label='kilometers'
              >
                km
              </label>

              <input
                type='radio'
                id='kWh'
                className='charge-input-modal__radio'
                name='amount'
                value='kWh'
              />
              <label
                htmlFor='kWh'
                className='charge-input-modal__radio-label'
                aria-label='kilowatt-hour'
              >
                kWh
              </label>
            </div>
          </div>
        </div>
        <button onClick={() => removeEditMode()}> save </button>
      </form>
    )
  }
  const ChargeTable = () => {
    return (
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
                <td className='history-charge__edit'>
                  <button
                    className='history-charge__button'
                    onClick={() => handleEditMode()}
                  >
                    edit
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    )
  }

  function handleEditMode() {
    setSessionEdit(true)
    console.log(sessionEdit)
  }

  function removeEditMode() {
    setSessionEdit(false)
    console.log(sessionEdit)
  }
  return <ChargeTable />
}
