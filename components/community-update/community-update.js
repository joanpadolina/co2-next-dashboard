import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { carbonReducer } from '../../lib/carbon-saving-calculation'
import Link from 'next/link'
import ProgressBar from '../progress-bar'
import IconArrowUp from '../../public/icons/icon-arrow-up.svg'

export default function CommunityUpdate() {
  const store = useSelector((state) => state.store)
  const communityStore = store.community
  const [usersTotal, setUserTotal] = useState(0)

  useEffect(() => {
    const community = carbonReducer(communityStore.users)
    const user = carbonReducer(store.chargingSession)
    setUserTotal(community + user)
  }, [communityStore.users, store.chargingSession])

  return (
    <article className='community-update'>
      <h2 className='font--title'>Community update</h2>

      <div className='community-update__body'>
        <article className='community-update__header'>
          <h3 className='community-update__total font--medium'>
            {usersTotal} kg
          </h3>
          <span className='community-update__subtitle'>
            Total CO<sub>2</sub> saved
          </span>
        </article>

        <article className='community-update__goal'>
          <h3 className='community-update__goal-destination'>
            <span className='community-update__subtitle community-update__subtitle--destination'>
              Amsterdam
            </span>
            Luxembourg
          </h3>
          <span className='community-update__endgoal'> 500 kg </span>
        </article>

        <ProgressBar
          className='community-update__progress-bar'
          totalSavingsCommunity={usersTotal}
          totalCommunityGoal={500}
        />
      </div>

      <div className='button__align--right'>
        <Link href='/community'>
          <a className='button button--dark'>view details</a>
        </Link>
      </div>

      <article className='community-update__energy-update'>
        <IconArrowUp className='community-update__energy-arrow' />
        <h3 className='community-update__energy-usage font--medium'>18%</h3>
        <p className='community-update__energy-body  font--small'>
          The community uses 18% more fossil energy than the week before.
        </p>
      </article>
    </article>
  )
}
