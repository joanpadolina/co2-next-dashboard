import React, { useState } from 'react'

export default function EmissionOverview() {
  const [currentDate, setCurrentDate] = useState('March 2021')

  const data = {
    totalEmission: 180,
    savedCarbon: 78,
    fossilFree: 15,
    fossil: 85
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
          <h4>{data.fossilFree}</h4>
          <p>Fossil-free energy used</p>
        </article>
        <article>
          <h4>{data.fossil}</h4>
          <p>Fossil energy used</p>
        </article>
      </article>
    </article>
  )
}
