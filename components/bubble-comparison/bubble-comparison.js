import React, { useState, useEffect } from 'react'
import { carbonReducer } from '../../lib/carbon-saving-calculation.js'
import { useSelector } from 'react-redux'

export default function BubbleComparison() {
  const store = useSelector((state) => state.store)
  const { community, chargingSession } = store
  const [contribution, setContribution] = useState(0)
  const [carbonTotal, setCarbonTotal] = useState(0)
  const [communityContribution, setCommunityContribution] = useState(0)

  useEffect(() => {
    const totalOfUsers = carbonReducer(community.users)
    const totalUser = carbonReducer(chargingSession)
    setCarbonTotal(totalUser)

    const data = {
      total: community.total,
      yours: totalUser
    }
    const progressScale = (1 * data.yours) / data.total
    setContribution(progressScale)

    if (totalUser >= totalOfUsers) {
      const progressCommunity = (1 * totalOfUsers) / totalUser
      setCommunityContribution(progressCommunity)
      setContribution(1)
    } else setCommunityContribution(1)
  }, [
    contribution,
    community,
    chargingSession,
    communityContribution,
    setCommunityContribution
  ])

  const BubbleTextCommunity = (value) => {
    if (communityContribution > 0.9) {
      return (
        <text
          x='50%'
          y='30%'
          textAnchor='middle'
          fill='#fff'
          className='bubble-comparison__bubble-text'
          fontFamily='Inter'
        >
          <tspan x='35%' y='50%' fontSize='9' fontWeight='bolder'>
            {value.total} kg
          </tspan>
          <tspan x='35%' y='65%' fontSize='5'>
            CO2 saved
          </tspan>
        </text>
      )
    } else {
      return (
        <text
          x='50%'
          y='30%'
          textAnchor='middle'
          fill='black'
          className='bubble-comparison__bubble-text'
          fontFamily='Inter'
        >
          <tspan x='0%' y='50%' fontSize='9' fontWeight='bolder'>
            {value.total} kg
          </tspan>
          <tspan x='0%' y='65%' fontSize='5'>
            CO2 saved
          </tspan>
        </text>
      )
    }
  }

  const BubbleTextPersonal = (value) => {
    if (contribution > 0.9 && contribution <= 1) {
      return (
        <text
          x='80%'
          y='50%'
          textAnchor='middle'
          fill='white'
          fontFamily='Inter'
          className='bubble-comparison__bubble-text'
        >
          <tspan x='80%' y='50%' fontSize='8' fontWeight='bolder'>
            {value.personal} kg
          </tspan>
          <tspan x='80%' y='65%' fontSize='3'>
            Your contribution
          </tspan>
        </text>
      )
    } else {
      return (
        <text
          x='80%'
          y='50%'
          textAnchor='middle'
          fill='black'
          fontFamily='Inter'
          className='bubble-comparison__bubble-text'
        >
          <tspan x='100%' y='50%' fontSize='8' fontWeight='bolder'>
            {carbonTotal} kg
          </tspan>
          <tspan x='100%' y='60%' fontSize='3'>
            Your contribution
          </tspan>
        </text>
      )
    }
  }

  return (
    <article className='bubble-comparison'>
      <div className='bubble-comparison__bubbles'>
        <svg className='bubble-comparison__bubble-wrapper' viewBox='0 0 50 50'>
          <g>
            <circle
              className='bubble-comparison__bubble-circle bubble-comparison__bubble-community'
              style={{ transform: `scale(${communityContribution})` }}
              cx='35%'
              cy='50%'
              r='20'
              fill='#red'
            />
            {communityContribution !== 0 && (
              <BubbleTextCommunity total={community.total} />
            )}
          </g>
          <g>
            <circle
              className='bubble-comparison__bubble-circle'
              style={{ transform: `scale(${contribution})` }}
              cx='80%'
              cy='50%'
              r='20'
              fill='#88B2D8'
            />
            {contribution !== 0 && <BubbleTextPersonal total={carbonTotal} />}
          </g>
        </svg>
      </div>
    </article>
  )
}
