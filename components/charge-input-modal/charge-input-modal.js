import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import diff from '../../lib/time-calculation'
import { useSelector, useDispatch } from 'react-redux'
import { addCharge } from '../../redux/actions'
import { carbonSavingCalculation } from '../../lib/carbon-saving-calculation.js'
import PopupAmount from '../popup-amount'

export default function ChargeTime() {
  const store = useSelector((state) => state.store)
  const [isBrowser, setIsBrowser] = useState(false)
  const [currentDate, setCurrentDate] = useState('')
  const [currentSavedCarbon, setCurrentSavedCarbon] = useState({})
  const [reveal, setReveal] = useState(false)
  const { user } = store
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    setIsBrowser(store.isOpen)

    // set date picker to today
    const setDateToday = new Date().toISOString().substr(0, 10)
    setCurrentDate(setDateToday)
  }, [store.isOpen])

  useEffect(() => {
    if (router.pathname === '/charge-input-modal') {
      setIsBrowser(false)
    }
  }, [router.pathname])

  useEffect(() => {
    if (reveal && !isBrowser) {
      setReveal(false)
    }
  }, [isBrowser, reveal])

  function chargeConfig(config = {}) {
    const newCharge = {
      date: config.date,
      start: config.startTime,
      end: config.endTime,
      duration: config.duration,
      amountCharge: config.amountCharge,
      chargedIn: config.chargedIn,
      savingsInPercentage: config.savings(),
      savedCarbon: config.savedCarbon()
    }
    return newCharge
  }

  function handleSubmit(e) {
    e.preventDefault()
    const input = handleInput(e)
    const data = chargeConfig(input)
    dispatch(addCharge(data))
    revealPopup()
  }

  function handleInput(e) {
    const date = e.target[0].value
    const startTime = e.target[1].value
    const endTime = e.target[2].value
    const duration = diff(startTime, endTime)
    const amountCharge = e.target[3].value
    const chargedIn = e.target[4].value

    const savedCarbon = () => {
      const total = carbonSavingCalculation(duration, user)
      return total / 100
    }

    setCurrentSavedCarbon({ total: savedCarbon(), date })

    const savings = () => Math.floor(Math.random() * 20) + '%'
    return {
      date,
      startTime,
      endTime,
      duration,
      amountCharge,
      chargedIn,
      savedCarbon,
      savings
    }
  }

  function changeDate(e) {
    e.preventDefault()
    return setCurrentDate(e.target.value)
  }

  const ShowCarbonAmount = () => {
    return <PopupAmount props={currentSavedCarbon} />
  }

  function revealPopup() {
    setTimeout(() => {
      setReveal(true)
    }, 0)
  }

  const FormCarbon = () => {
    return (
      <section className='charge-input-modal charge-input-modal--modal'>
        <form
          className='charge-input-modal__form charge-input-modal__form--modal form-reveal-enter '
          action=''
          onSubmit={(e) => handleSubmit(e)}
        >
          <h2 className='charge-input-modal__title font--title'>
            At what time did you charge?
          </h2>

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
                required
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
                required
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
                required
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

          <div className='button-wrapper'>
            <Link href='/charge-input-modal'>
              <a className='button--secondary charge-input-modal__link'>
                add another session
              </a>
            </Link>

            <button className='charge-input-modal__save button'>
              save changes
            </button>
          </div>
        </form>
      </section>
    )
  }

  if (isBrowser) {
    if (!reveal) {
      return <FormCarbon />
    } else {
      return <ShowCarbonAmount />
    }
  } else {
    return null
  }
}
