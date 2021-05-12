import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import CountUp from 'react-countup'

export default function Header({ user, currentCarbon }) {
  const [trees, setTrees] = useState(0)

  useEffect(() => {
    function calcTreeSavings() {
      const averageTree = 20
      const totalTrees = Math.floor(currentCarbon / averageTree)
      return setTrees(totalTrees)
    }
    calcTreeSavings()
  }, [currentCarbon])

  return (
    <header className='header'>
      <div>
        <h1 className='header__intro'>Hello {user.name},</h1>
        <div className='header__account'></div>
        <span className='header__subtitle'>
          This is your savings since 01-01-2021
        </span>
      </div>
      <Link
        className='header__carbon flex flex-col justify-center items-center h-2/4'
        href='/profile'
      >
        <section className='header__savings'>
          <span className='header__carbon-subtitle'>Your total saved CO2</span>
          <h2 className='header__carbon-amount font--big'>
            <CountUp
              start={currentCarbon - 10}
              end={currentCarbon}
              duration={1}
            >
              {currentCarbon}
            </CountUp>{' '}
            kg
          </h2>
        </section>
      </Link>
      <Link
        className='header__carbon flex flex-col justify-center items-center h-2/4'
        href='/profile'
      >
        <p className='header__body'>
          Your total CO2 saving is the same amount as {trees} trees absorbs CO2
          in 1 year.
        </p>
      </Link>
    </header>
  )
}
