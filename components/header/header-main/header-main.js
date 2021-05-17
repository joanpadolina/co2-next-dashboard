import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import CountUp from 'react-countup'
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
          Your total saved CO<sub>2</sub>{' '}
          <span className='header__subtitle'>since 01-01-2021</span>
        </p>
        <h2 className='header__carbon-amount'>
          <CountUp start={currentCarbon - 10} end={currentCarbon} duration={1}>
            {currentCarbon}
          </CountUp>{' '}
          kg
        </h2>
      </section>

      <Link
        className='header__carbon flex flex-col justify-center items-center h-2/4'
        href='/profile'
      >
        <a className='header__detail-savings'>
          <p className='header__body'>
            <div>
              Your total CO<sub>2</sub> saving is the same amount as{' '}
              <span className='header__highlight-tree'>
                {trees} {trees <= 1 ? 'tree' : 'trees'}{' '}
              </span>
              absorbs CO<sub>2</sub> in 1 year.
            </div>
            <IconSoftArrow className='header__arrow' />
          </p>
        </a>
      </Link>
    </header>
  )
}
