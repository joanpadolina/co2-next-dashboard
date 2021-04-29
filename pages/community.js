import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { communitySavings } from '../redux/actions/'
import { members } from '../lib/members'
import useInitUser from '../lib/useInitUser'
import { carbonReducer } from '../lib/carbon-saving-calculation'
import { calcCarbonToKm } from '../lib/gimmick-calc'
import ProgressBar from '../components/progress-bar'
import BubbleComparison from '../components/bubble-comparison'

export default function Community() {
  const store = useSelector((state) => state.store)
  const { chargingSession, community, user } = store
  const users = community.users
  const dispatch = useDispatch()

  const [membersContribution, setMembersContribution] = useState()
  const [totalCarbon, setTotalCarbon] = useState()
  const [carbonInKm, setCarbonInKm] = useState(12)

  useInitUser()

  // calculation from carbon to total distance in kilometers
  useEffect(() => {
    async function calcInKm() {
      const petrolDistance = await calcCarbonToKm(totalCarbon)
      setCarbonInKm(petrolDistance)
    }
    calcInKm()
  }, [totalCarbon])

  // get recent charge and show it as first in the table
  useEffect(() => {
    const historyLast = chargingSession.slice(-1)
    const userContribution = {
      name: user.name,
      savedCarbon: historyLast[0].savedCarbon
    }
    setMembersContribution([...users, userContribution])
  }, [chargingSession, user.name, users])

  // contribution of the whole community
  useEffect(() => {
    const userTotal = carbonReducer(chargingSession)
    const totalCommunity = carbonReducer(users)
    setTotalCarbon(userTotal + totalCommunity)
    dispatch(communitySavings(totalCarbon))
  }, [dispatch, totalCarbon, chargingSession, users])

  return (
    <>
      <header className='header community__header'>
        <h1 className='community__title'>Your community</h1>
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
      <main className='index__main community__main'>
        <article>
          <section className='community-saved__datavisual'>
            <article>
              <h2 className='font--title'>Community total saved CO2</h2>
              <BubbleComparison />
              <p className='community__datavisual-body'>
                The amount of CO2 saved is the same as driving{' '}
                <span>{carbonInKm} km</span> in a petrol car.
              </p>
            </article>
          </section>
        </article>

        <article className='community__distance'>
          <h2 className='font--title'>Communities next goal</h2>
          <section className='community__distance-body'>
            <div className='community__distance-goal community__distance-margin--bottom'>
              <h3 className='community__distance-title'>
                Amsterdam {'-->'} Luxembourg
              </h3>
              <p className='community__distance-goal-value'>{carbonInKm} km</p>
            </div>
            <div className='community__distance-goal--right'>
              <p className='community__distance-value'>500 kg</p>
              <span className='community__distance-value'>~410 km</span>
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

              {membersContribution &&
                membersContribution.map((user, key) => (
                  <tr key={key}>
                    <td>
                      {members.map((data) => {
                        if (data.name.includes(user.name)) {
                          return (
                            <img
                              alt={user.name}
                              key={key}
                              className='community__profile-image'
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

        <article className='community__members'>
          <h3 className='font--title'>Community members</h3>
          <ul className='flat-list community__members-list'>
            {members.map((member, key) => (
              <li key={key}>
                <figure className='community__member'>
                  <img
                    className='community__profile-image'
                    src={member.imgSrc}
                    alt={member.name}
                  />
                  <figcaption className='community__member-name'>
                    {member.name}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </article>
      </main>
    </>
  )
}
