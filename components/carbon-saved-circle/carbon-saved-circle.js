import React from 'react'
import Link from 'next/link'

export default function CarbonSaved({ carbon }) {
  return (
    <Link
      className='header__carbon flex flex-col justify-center items-center h-2/4'
      href='/profile'
    >
      <section>
        <span className='header__carbon-subtitle'>your carbon saved</span>
        <h2 className='header__carbon-amount text-5xl font-extrabold'>
          {carbon} kg
        </h2>
      </section>
    </Link>
  )
}
