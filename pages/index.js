import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { carbonReducer } from "../lib/carbon-saving-calculation";
import HeaderCarbon from "../components/header/header-main/header-main";
import SavingsTime from "../components/savings-time";
import CommunityUpdate from "../components/community-update/community-update";

export default function Index() {
  const user = useSelector((state) => state.store.user);
  const [currentCarbon, setCurrentCarbon] = useState(0);
  const store = useSelector((state) => state.store);
  const { chargingSession } = store;

  useEffect(() => {
    const chargeCarbonTotal = carbonReducer(chargingSession);
    setCurrentCarbon(chargeCarbonTotal);
  }, [chargingSession, currentCarbon]);

  return (
    <div className='home__body'>
      <HeaderCarbon currentCarbon={currentCarbon} user={user} />
      <main>
        <SavingsTime />
        <CommunityUpdate />
      </main>
    </div>
  );
}
