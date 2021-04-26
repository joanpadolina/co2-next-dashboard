import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { communitySavings } from '../redux/actions/'
import { members } from '../lib/members'
import { carbonReducer } from '../lib/carbon-saving-calculation'
import { calcCarbonToKm } from '../lib/gimmick-calc'
import ProgressBar from '../components/progress-bar'
import BubbleComparison from '../components/bubble-comparison'

export default function Community() {
  const store = useSelector((state) => state.store)
  const userChargingSession = store.chargingSession
  const users = store.community.users
  const dispatch = useDispatch()
  const { chargingSession } = store
  const [membersContribution, setMembersContribution] = useState([])
  const [totalCarbon, setTotalCarbon] = useState()
  const [carbonInKm, setCarbonInKm] = useState(12)
  const [userContribution, setUserContribution] = useState(
    chargingSession[0].savedCarbon
  )

  useEffect(() => {
    async function calcInKm() {
      const petrolDistance = await calcCarbonToKm(totalCarbon)
      setCarbonInKm(petrolDistance)
    }
    calcInKm()

    const historyLast = chargingSession
      .slice(-1)
      .map((data) => data.savedCarbon)

    const userContribution =
      typeof store.total !== 'function' ? store.total : historyLast[0]

    // last update first on the list
    setMembersContribution(users.reverse())
    const userTotal = carbonReducer(userChargingSession)
    const total = users.reduce(
      (sum, { savedCarbon }) => Math.ceil(sum + savedCarbon),
      0
    )
    setTotalCarbon(userTotal + total)
    setUserContribution(userTotal)
    dispatch(communitySavings(totalCarbon))
  }, [
    setMembersContribution,
    chargingSession,
    store.total,
    dispatch,
    totalCarbon,
    users
  ])

  return (
    <>
      <header className='header'>
        <h1>Your community</h1>
        <article className='community__header-body'>
          <p className='community__header-p community__header-people community__header-padding--right'>
            <span className='community__header-amount'> 8 </span> People
          </p>
          <p className='community__header-p community__header-padding--left'>
            <span className='community__header-amount'> 3 </span> Destination
            reached
          </p>
        </article>
      </header>
      <main className='index__main'>
        <article>
          <section className='community-saved__datavisual'>
            <article>
              <h2 className='font--title'>Community total saved CO2</h2>
              <BubbleComparison />
              <p>
                The amount of CO2 saved is the same as driving{' '}
                <span>{carbonInKm} km</span> in a petrol car.
              </p>
            </article>
          </section>
        </article>

        <article>
          <h2 className='font--title'>Communities next goal</h2>
          <section>
            <div>
              <h3>Amsterdam {'-->'} Luxembourg</h3>
              <p>{carbonInKm} km</p>
            </div>
            <div>
              <p>
                500 kg
                <span>~410 km</span>
              </p>
            </div>
          </section>
          <ProgressBar
            totalSavingsCommunity={totalCarbon}
            totalCommunityGoal={500}
          />
        </article>
        <article>
          <h2 className='font--title'> Co2 contributions</h2>
          <p> -- chart -- </p>
        </article>
        <article>
          <h2 className='font--title'>Activiy</h2>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>Name</th>
                <th>CO2 saved</th>
              </tr>

              {membersContribution.map((user, key) => (
                <tr key={key}>
                  <td>
                    {members.map((data) => {
                      if (data.name.includes(user.name)) {
                        return (
                          <img
                            alt={user.name}
                            key={key}
                            src={
                              data.name.includes(user.name) ? data.imgSrc : ''
                            }
                          />
                        )
                      }
                      return ''
                    })}
                  </td>
                  <td> {user.name}</td>
                  <td>{user.savedCarbon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article>
          <h3>Community members</h3>
          <ul>
            {members.map((member, key) => (
              <li key={key}>
                <figure>
                  <img src={member.imgSrc} alt={member.name} />
                  <figcaption>{member.name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </article>
      </main>
    </>
  )
}
