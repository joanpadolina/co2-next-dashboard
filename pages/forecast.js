import { useEffect, useState } from 'react'
import Link from 'next/link'
import getForecast from '../lib/getForcast'
import { Bar } from 'react-chartjs-2'
import { InfluxDB } from '@influxdata/influxdb-client'

export default function Forecast({ forecast }) {
  const [savings, setSavings] = useState()
  const [date, setDate] = useState()

  useEffect(() => {
    const data = getForecast(forecast)
    const sorting = data.sort((a, b) => a.label[0] - b.label[0])
    setSavings(sorting)
  }, [forecast])

  useEffect(() => {
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)
    setDate(today.toDateString())
  }, [])

  const savingsData = savings && savings.map((item) => item.savings)
  const labels = savings && savings.map((item) => item.label)

  const barColor = []

  if (savings) {
    for (let i = 0; i < savingsData.length; i++) {
      const green = '#adfdd7'
      const midgreen = '#48c98c'
      const low = '#2d7e58'

      if (savingsData[i] >= 15) {
        barColor[i] = green
      } else if (savingsData[i] >= 10 || savingsData[i] >= 14) {
        barColor[i] = midgreen
      } else {
        barColor[i] = low
      }
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        axis: 'y',
        label: 'Savings',
        data: savingsData,
        backgroundColor: barColor,
        borderWidth: 1
      }
    ]
  }

  return (
    <div className='forecast'>
      <header>
        <Link href='/'>
          <a className='button--back' aria-label='go back to feed'></a>
        </Link>
        <h1> CO2-Smart Charging:</h1>
        <h2>Forecast: {date}, NL</h2>
      </header>
      <main>
        <Bar
          data={data}
          options={{
            plugins: {
              legend: {
                display: false
              }
            },
            indexAxis: 'y',
            scales: {
              x: {
                grid: {
                  display: false
                },
                title: {
                  display: true,
                  text: 'savings (%)',
                  color: '#9E9AA7'
                }
              },
              y: {
                grid: {
                  display: false
                },
                title: {
                  display: true,
                  text: 'timeslots',
                  color: '#9E9AA7'
                }
              }
            }
          }}
          width={400}
          height={700}
        />
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const token = process.env.INFLUXDB_TOKEN
  const url = process.env.INFLUX_API_URL
  const org = process.env.INFLUX_API_ORG
  const zone = 'NL'

  const client = new InfluxDB({ url, token })

  const queryApi = client.getQueryApi(org)
  const fluxQuery = `from(bucket: "elmap")
    |> range(start: now(), stop: 2d)
    |> filter(fn: (r) => r["_measurement"] == "forecast")
    |> filter(fn: (r) => r["_field"] == "carbonIntensity")
    |> filter(fn: (r) => r["kind"] == "totals")
    |> filter(fn: (r) => r["timeoffset"] == "baseline")
    |> filter(fn: (r) => r["zone"] == "${zone}")`
  const data = await queryApi.collectRows(fluxQuery)

  return {
    props: {
      forecast: data
    }
  }
}
