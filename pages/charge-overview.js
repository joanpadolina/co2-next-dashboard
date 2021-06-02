import React from 'react'
import Link from 'next/link'
import HistoryCharge from '../components/history-charge'
import EmissionOverview from '../components/emission-overview'

export default function ChargeOverview() {
  return (
    <div className='home__body'>
      <header className='header charge-overview__header'>
        <Link href='/'>
          <a className='button--back' aria-label='go back to feed'></a>
        </Link>
        <h1 className='charge-overview__title'>Charge overview</h1>
      </header>
      <main className='main'>
        <h2 className='font--title'>Charge history</h2>
        <HistoryCharge />
        <EmissionOverview />
      </main>
    </div>
  )
}
