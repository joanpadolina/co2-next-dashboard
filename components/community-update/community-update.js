import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import ProgressBar from '../progress-bar';
export default function CommunityUpdate() {
  const communityStore = useSelector((state) => state.store.community);
  const usersTotal = communityStore.total;
  useEffect(() => {}, [usersTotal]);

  return (
    <article className="community-update">
      <h2 className="font--title">Community update</h2>
      <div className="community-update__body">
        <article className="community-update__header">
          <h3 className="community-update__total font--medium">
            {usersTotal} kg
          </h3>
          <span className="community-update__subtitle">Total carbon saved</span>
        </article>
        <article className="community-update__goal">
          <h3 className="community-update__goal-destination">
            <span className="community-update__subtitle community-update__subtitle--destination">
              Amsterdam
            </span>
            Maastricht
          </h3>
          <span className="community-update__endgoal"> 500kg </span>
        </article>
        <ProgressBar
          className="community-update__progress-bar"
          totalSavingsCommunity={usersTotal}
          totalCommunityGoal={500}
        />
      </div>
      <div className="button__align--right">
        <Link href="/">
          <a aria-label="community detail" className="button--go"></a>
        </Link>
      </div>
      <article className="community-update__energy-update">
        <img
          className="community-update__energy-arrow"
          src="/icons/icon-arrow-up.svg"
        />
        <h3 className="community-update__energy-usage font--medium">18%</h3>
        <p className="community-update__energy-body  font--small">
          The community uses 18% more fossil energy than the week before.
        </p>
      </article>
    </article>
  );
}
