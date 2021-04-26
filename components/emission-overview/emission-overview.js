import { data } from 'autoprefixer'
import React, { useState } from 'react'

export default function EmissionOverview() {
  const [currentDate, setCurrentDate] = useState('March 2021')
  const data = {
    totalEmission: 180,
    savedCarbon: 78,
    greenEnergy: 15,
    greyEnergy: 85
  }

  return (
    <article>
      <h2>Emission overview</h2>
      <section>
        <button>Monthly</button>
        <button>Yearly</button>
      </section>
      <section>
        <button>Left</button>
        <h3>{currentDate}</h3>
        <button>Right</button>
      </section>
      <article>
        <h3>{currentDate}</h3>
        <article>
          <h4>{data.totalEmission}</h4>
          <p>Total emission</p>
        </article>
        <article>
          <h4>{data.savedCarbon}</h4>
          <p>Saved Carbon</p>
        </article>
        <article>
          <h4>{data.greenEnergy}</h4>
          <p>Green energy used</p>
        </article>
        <article>
          <h4>{data.greyEnergy}</h4>
          <p>Grey energy used</p>
        </article>
      </article>
    </article>
  )
}
