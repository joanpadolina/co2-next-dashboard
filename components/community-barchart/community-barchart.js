import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'

export default function CommunityBarchart({ contribution }) {
  const [usersContribution, setUsersContribution] = useState()
  const [userLabel, setUserLabel] = useState()
  const [userData, setUserData] = useState()

  useEffect(() => {
    setUsersContribution(contribution)
    console.log('here', usersContribution)
    if (usersContribution) {
      const user = usersContribution.map((data) => data.name)
      const data = usersContribution.map((data) => data.savedCarbon)
      setUserLabel(user)
      setUserData(data)

      console.log('here', [...data] + ' kg')
    }
  }, [contribution, usersContribution])

  const data = {
    labels: userLabel,
    datasets: [
      {
        label: 'Saved CO2 in kg',
        data: userData,
        backgroundColor: ['#88B2D8', '#7F8595', '#7F8595', '#7F8595'],
        barThickness: 25,
        borderRadius: 5
      }
    ]
  }

  return (
    <article className='community-barchart__chart'>
      <Bar
        data={data}
        options={{
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              title: {
                display: true,
                text: '',
                color: '#9E9AA7'
              }
            },
            y: {
              grid: {
                display: false
              },
              title: {
                display: true,
                text: 'total saved CO2 (kg)',
                color: '#9E9AA7'
              }
            }
          }
        }}
        width={400}
        height={300}
      />
    </article>
  )
}
