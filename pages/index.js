import React, {useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux'
import HeaderCarbon from '../components/header/header-main/header-main';
import SavingsTime from '../components/savings-time';
import CommunityUpdate from '../components/community-update/community-update';
import { fetchUser } from '../redux/actions';

export default function Home() {
  const userCarbon = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser)
  },[dispatch])
  
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