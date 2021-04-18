import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { modalActive } from '../../redux/actions/index';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Nav() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const currentRouter = router.pathname;

  // 1. Open modal if clicked on the link
  // 2. if modal active change link to closing button
  // 3. problem the button is one click behind when clicked
  // on another link in navigation

  useEffect(() => {
    dispatch(modalActive(isOpen));
  }, [isOpen, currentRouter, dispatch, router]);

  function handleRoutingCharge() {
    setIsOpen(!isOpen);
  }
  return (
    <nav className="nav">
      <ul className="nav__list flat-list">
        <li
          className={`nav__item ${
            router.pathname === '/' ? 'nav--active' : ''
          }`}
        >
          <Link href="/">
            <a>Homepage</a>
          </Link>
        </li>
        <li className="nav__item">
          <Link href={!isOpen ? '?charge' : ''}>
            <a
              className={`nav__button--add nav__item${
                isOpen || currentRouter === '/charge-input'
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
              className={`${
                currentRouter === '/community' ? 'nav--active' : ''
              }`}
            >
              Community
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
