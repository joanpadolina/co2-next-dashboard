import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../redux/actions';
import HeaderCarbon from '../components/header/header-main/header-main';
import SavingsTime from '../components/savings-time';
import CommunityUpdate from '../components/community-update/community-update';

export default function Home() {
  return (
    <div className="home__body">
      <HeaderCarbon />
      <main>
        <SavingsTime />
        <CommunityUpdate />
      </main>
    </div>
  );
}