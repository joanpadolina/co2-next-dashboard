import React, { useState, useEffect } from 'react'
import IconArrow from '../../public/icons/icon-arrow-up.svg'

export default function EmissionOverview() {
  const [currentDate, setCurrentDate] = useState('March 2021')
  const [toggleActive, setToggleActive] = useState('Monthly')

  const data = {
    totalEmission: 180,
    savedCarbon: 78,
    fossilFree: 15,
    fossil: 85
  }

  useEffect(() => {
    if (toggleActive === 'Yearly') {
      setCurrentDate('2021')
    } else {
      setCurrentDate('March 2021')
    }
  }, [currentDate, toggleActive])

  const MonthlyOverview = () => {
    return (
      <article className='emission-overview__total'>
        <article className='emission-overview__value'>
          <h4 className='emission-overview__value-title'>
            {data.totalEmission} kg
          </h4>
          <p>CO2 total</p>
        </article>

        <article className='emission-overview__value'>
          <h4 className='emission-overview__value-title'>
            {data.savedCarbon} kg
          </h4>
          <p>CO2 saved</p>
        </article>

        <article className='emission-overview__value'>
          <h4 className='emission-overview__value-title'>{data.fossilFree}%</h4>
          <p>Fossil-free energy used</p>
        </article>

        <article className='emission-overview__value'>
          <h4 className='emission-overview__value-title'>{data.fossil} kWh</h4>
          <p>Fossil energy used</p>
        </article>
      </article>
    )
  }

  const YearlyOverview = () => {
    return (
      <article className='emission-overview__total'>
        <article className='emission-overview__value'>
          <h4 className='emission-overview__value-title'>500 kg</h4>
          <p>CO2 total</p>
        </article>

        <article className='emission-overview__value'>
          <h4 className='emission-overview__value-title'>300 kg</h4>
          <p>CO2 saved</p>
        </article>

        <article className='emission-overview__value'>
          <h4 className='emission-overview__value-title'>25%</h4>
          <p>Fossil-free energy used</p>
        </article>

        <article className='emission-overview__value'>
          <h4 className='emission-overview__value-title'>235 kWh</h4>
          <p>Fossil energy used</p>
        </article>
      </article>
    )
  }
  return (
    <article className='emission-overview'>
      <h2 className='font--title'>CO2 overview</h2>
      <section className='emission-overview__toggle-wrapper'>
        <input
          type='radio'
          className='emission-overview__radio'
          id='monthly'
          name='kind'
          value='Monthly'
          defaultChecked
          onClick={() => setToggleActive('Monthly')}
        />
        <label
          htmlFor='monthly'
          className='emission-overview__radio-toggle'
          aria-label='Monthly'
        >
          Monthly
        </label>

        <input
          type='radio'
          id='yearly'
          className='emission-overview__radio'
          name='kind'
          value='Yearly'
          onClick={() => setToggleActive('Yearly')}
        />
        <label
          htmlFor='yearly'
          className='emission-overview__radio-toggle'
          aria-label='Yearly'
        >
          Yearly
        </label>
      </section>

      <section className='emission-overview__calendar-selection'>
        <button className='emission-overview__button'>
          <IconArrow className='emission-overview__select-arrow' />
        </button>
        <h3 className='emission-overview__calendar-date'>{currentDate}</h3>
        <button className='emission-overview__button'>
          <IconArrow className='emission-overview__select-arrow emission-overview__select-arrow--right' />
        </button>
      </section>
      {toggleActive === 'Monthly' ? <MonthlyOverview /> : <YearlyOverview />}
    </article>
  )
}
