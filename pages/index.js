import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { carbonReducer } from '../lib/carbon-saving-calculation'
import useInitUser from '../lib/useInitUser'
import HeaderCarbon from '../components/header'
import SavingsTime from '../components/savings-time'
import CommunityUpdate from '../components/community-update'
import HistoryCharge from '../components/history-charge'

export default function Index({ props }) {
  const store = useSelector((state) => state.store)
  const user = store.user
  const { chargingSession } = store
  const [currentCarbon, setCurrentCarbon] = useState(0)
  const [dbCharge, setDbCharge] = useState()
  useInitUser()

  useEffect(() => {
    const chargeCarbonTotal = carbonReducer(dbCharge)
    setCurrentCarbon(chargeCarbonTotal)
  }, [currentCarbon, dbCharge])

  useEffect(() => {
    async function getData() {
      const firebaseStore = await fetch('/api/entries')
      const json = await firebaseStore.json()
      setDbCharge(json.entriesData)
      return {
        json
      }
    }
    getData()
  }, [])

  return (
    <div className='home__body'>
      <HeaderCarbon user={user} currentCarbon={currentCarbon} />
      <main className='main'>
        <SavingsTime />
        <h2 className='font--title'>Your latest charge</h2>
        <HistoryCharge data={dbCharge} />
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
