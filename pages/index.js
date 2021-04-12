import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../redux/actions';
import HeaderCarbon from '../components/header/header-main/header-main';
import SavingsTime from '../components/savings-time';
import CommunityUpdate from '../components/community-update/community-update';
import RecentCharge from '../components/recent-charge/recent-charge';
import HistoryCharge from '../components/history-charge/history-charge';

export default function Home() {
  const dispatch = useDispatch();
  dispatch(fetchUser);

  useEffect(() => {}, []);

  return (
    <div className="home__body">
      <HeaderCarbon />
      <main className="index__main">
        <SavingsTime />
        <RecentCharge />
        <HistoryCharge />
        <CommunityUpdate />
      </main>
    </div>
  );
}
