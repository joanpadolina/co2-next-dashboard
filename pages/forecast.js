import { useEffect } from 'react'
import Link from 'next/link'

export default function Forecast({ forecast }) {
  useEffect(() => {
    console.log(forecast)
  }, [forecast])

  return (
    <div className='savings-time'>
      <header>
        <Link href='/'>
          <a className='button--back'>back</a>
        </Link>
        <h1> CO2-Smart Charging:</h1>
        <h2>Forecast 14 Mei, NL</h2>
      </header>
      <main>
        <p>
          <pre>{JSON.stringify(forecast, null, 2)}</pre>
        </p>
        {/* <ul>
          {forecast.map((item, index) => (
            <li key={item.index}>{item._value}</li>
          ))}
        </ul> */}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const { InfluxDB } = require('@influxdata/influxdb-client')

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
