import React from 'react'
import Link from 'next/link'

export default function SavingsTime() {
  return (
    <Link href='/savings-time'>
      <a className='savings-time'>
        <article>
          <h3 className='savings-time__timeslot'>13:00 PM - 16:00 PM</h3>
          <p>Charging today saves up to 16% on CO2 emissions.</p>
        </article>
      </a>
    </Link>
  )
}
