import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import IconSoftArrow from '../../../public/icons/icon-soft-arrow.svg'

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
      </div>
      <section className='header__savings'>
        <p className='header__carbon-subtitle'>
          Your total saved CO2{' '}
          <span className='header__subtitle'>since 01-01-2021</span>
        </p>
        <h2 className='header__carbon-amount'>{currentCarbon} kg</h2>
      </section>
      <Link
        className='header__carbon flex flex-col justify-center items-center h-2/4'
        href='/profile'
      >
        <a className='header__detail-savings'>
          <p className='header__body'>
            Your total CO2 saving is the same amount as {trees} trees absorbs
            CO2 in 1 year.
            <IconSoftArrow className='header__arrow' />
          </p>
        </a>
      </Link>
    </header>
  )
}
