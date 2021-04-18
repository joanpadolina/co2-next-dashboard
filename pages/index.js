import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { carbonReducer } from '../lib/carbon-saving-calculation';
import HeaderCarbon from '../components/header/header-main/header-main';
import SavingsTime from '../components/savings-time';
import CommunityUpdate from '../components/community-update/community-update';

export default function Index() {
  const userCarbon = useSelector((state) => state.user);
  const [currentCarbon, setCurrentCarbon] = useState(0);
  const user = userCarbon.userData;

  useEffect(() => {
    const chargeCarbonTotal = carbonReducer(userCarbon.historyCharge);
    setCurrentCarbon(chargeCarbonTotal);

  }, [userCarbon.historyCharge, userCarbon, currentCarbon]);


  return (
    <div className="home__body">
      <HeaderCarbon currentCarbon={currentCarbon} user={user} />
      <main>
        <SavingsTime />
        <CommunityUpdate />
      </main>
    </div>
  );
}
