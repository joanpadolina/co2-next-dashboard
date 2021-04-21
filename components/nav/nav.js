import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalActive } from '../../redux/actions/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import IconFeed from '../../public/icons/icon-feed.svg';
import IconCommunity from '../../public/icons/icon-community.svg';

export default function Nav() {
  const store = useSelector((state) => state.store);
  const stateIsOpen = store.isOpen;
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const currentRouter = router.pathname;
  const dispatch = useDispatch();

  // 1. Open modal if clicked on the link
  // 2. if modal active change link to closing button
  // 3. problem the button is one click behind when clicked
  // on another link in navigation

  useEffect(() => {
    dispatch(modalActive(isOpen));
  }, [dispatch, isOpen]);

  function handleRoutingCharge() {
    setIsOpen(!isOpen);
  }
  
  return (
    <nav className="nav">
      <ul className="nav__list flat-list">
        <li className="nav__item">
          <Link href="/">
            <a
              className={`nav__link ${stateIsOpen ? 'disabled ' : ''}${
                currentRouter === '/' ? 'nav--active' : ''
              }`}
            >
              <IconFeed className="icon icon--feed" />
              Homepage
            </a>
          </Link>
        </li>
        <li className="nav__item">
          <Link href={!isOpen ? '?charge' : ''}>
            <a
              className={`nav__button--add nav__item${
                stateIsOpen || currentRouter === '/charge-input'
                  ? ' nav-input--active'
                  : ''
              }`}
              aria-label="add new charge"
              onClick={handleRoutingCharge}
            ></a>
          </Link>
        </li>
        <li className={`nav__item`}>
          <Link href="/community">
            <a
              className={`nav__link ${stateIsOpen ? 'disabled' : ''} ${
                currentRouter === '/community' ? 'nav--active' : ''
              }`}
            >
              <IconCommunity className="icon" />
              Community
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
