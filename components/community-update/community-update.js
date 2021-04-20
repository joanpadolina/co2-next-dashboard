import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProgressBar from '../progress-bar';

export default function CommunityUpdate() {
  const communityStore = useSelector((state) => state.store.community);
  const userTotal = communityStore.total
  useEffect(() => {}, [userTotal]);

  return (
    <article>
      <h2 className="title--small">Community update</h2>
      <div className="p-3 bg-gray-100 rounded-lg">
        <article className="pb-3">
          <h3 className="text-2xl font-bold">{userTotal}</h3>
          <span>Total carbon saved</span>
        </article>
        <article className="flex justify-between my-3">
          <h3>Amsterdam -- Maastricht</h3>
          <span> 500kg </span>
        </article>
        <ProgressBar
          totalSavingsCommunity={communityStore.total}
          totalCommunityGoal={500}
        />
      </div>
      <div>
        <article className="bg-gray-100 flex p-5 items-center my-5">
          <div>arrowUp</div>
          <h3 className="text-2xl font-bold pr-3">18%</h3>
          <p>The community uses 18% more grey energy than the week before</p>
        </article>
      </div>
    </article>
  );
}
