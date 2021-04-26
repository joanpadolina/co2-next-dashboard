import React, { useState } from 'react'
import { modalActive } from '../../redux/actions'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

export default function PopupAmount({ props }) {
  const [popupActive, setPopupActive] = useState(true)
  const router = useRouter()
  const dispatch = useDispatch()

  function handleButton() {
    setPopupActive(!popupActive)
    router.push('')
    dispatch(modalActive(false))
  }
  return (
    <>
      {popupActive && (
        <div className='popup-amount'>
          <article className='popup-amount__body'>
            <p className='popup-amount__date'> {props.date} </p>
            <p> Good job! </p>
            <p className='popup-amount__subtext'>
              You just saved{' '}
              <span className='font--medium popup-amount__carbon'>
                {props.total} kg
              </span>{' '}
              CO2
            </p>
          </article>
          <button
            className='popup-amount__button'
            aria-label='close amount co2'
            onClick={handleButton}
          ></button>
        </div>
      )}
    </>
  )
}
