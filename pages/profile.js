import React from "react";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import CarbonSaved from "../components/carbon-saved-circle/carbon-saved-circle";

export default function Profile() {
  const data = useSelector(state => state.user)
  const user = data.userData
  const carbon = data
  console.log(carbon)
  return (
    <main>
      <Link href='/'>back</Link>
      <h1>Hello {user.name}</h1>
      <span>{user.car}</span>
      <button>edit</button>
      {/* <CarbonSaved carbon={carbon.total} /> */}
      <article>
        <h2>Keep going strong</h2>
        <section></section>
      </article>
    </main>
  );
}
