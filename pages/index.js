import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { carbonReducer } from '../lib/carbon-saving-calculation'
import useInitUser from '../lib/useInitUser'
import HeaderCarbon from '../components/header/header-main'
import SavingsTime from '../components/savings-time'
import CommunityUpdate from '../components/community-update'
import HistoryCharge from '../components/history-charge'
import CommunityBubble from '../components/bubble-comparison'

export default function Index() {
  const store = useSelector((state) => state.store)
  const user = store.user
  const { chargingSession } = store
  const [currentCarbon, setCurrentCarbon] = useState(0)

  useInitUser()

  useEffect(() => {
    const chargeCarbonTotal = carbonReducer(chargingSession)
    setCurrentCarbon(chargeCarbonTotal)
  }, [chargingSession])

  const DesktopView = () => {
    return (
      <div className='index__desktop'>
        <header>
          <img src='' alt='user'></img>
          <h1>Goodmorning, John</h1>
          <h2>Here is your recap of your recent activities</h2>
        </header>
        <main>
          <article>
            <article>
              <section>
                <h2>Your total saved CO2</h2>
                <span>45 kg</span>
              </section>
              <section>
                <h2>Your current rank</h2>
                <span>5th place</span>
              </section>
            </article>
            <article>
              <h3>Your CO2 savings overview</h3>
              <label>Period</label>
              <input type='date' />
              <label>to</label>
              <input type='date' />
            </article>
            <section>data</section>
          </article>
          <article>
            <section>
              <h2>My charging sessions</h2>
              <button>+ add new session</button>
            </section>
            <table></table>
          </article>
          <article>
            <h2>Total carbon savings equivalence</h2>
            <section>
              <h3>Short haul fligt</h3>
              <span>29 km</span>
            </section>

            <section>
              <h3>Average petrol car</h3>
              <span>45 km</span>
            </section>

            <section>
              <h3>Domestic train</h3>
              <span>200 km</span>
            </section>
          </article>
          <article>
            <h2>CO2 savings overtime</h2>
            <section>data enzo</section>
          </article>
          <SavingsTime />
          <CommunityBubble />
        </main>
      </div>
    )
  }

  return (
    <div className='home__body'>
      <HeaderCarbon user={user} currentCarbon={currentCarbon} />
      <main className='index__main'>
        <SavingsTime />
        <h2 className='font--title'>Your latest charge</h2>
        <HistoryCharge />
        <div className='button__align--right'>
          <Link href='/charge-overview'>
            <a className='button button--dark index__link-sessions'>
              Charge overview
            </a>
          </Link>
        </div>
        <CommunityUpdate />
      </main>
    </div>
  )
}
