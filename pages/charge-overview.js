import React from "react"
import Link from "next/link"
import HistoryCharge from '../components/history-charge'
import EmissionOverview from '../components/emission-overview'
export default function ChargeOverview() {
  return (
    <>
      <header className='header charge-overview__header'>
        <Link href='/'>
          <a className='button--back' aria-label='go back to feed'></a>
        </Link>
        <h1>Charge overview</h1>
      </header>
      <main className='index__main'>
        <h2 className='font--title'>Charge history</h2>
        <HistoryCharge />
        <EmissionOverview />
      </main>
    </>
  )
}
