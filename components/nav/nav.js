import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Nav() {
  const [isBrowser, setIsBrowser] = useState(false);
  const router = useRouter();

  useState(() => {
    setIsBrowser(true);
  }, []);

  const handleInputView = (e) => {
    console.log('clickedss', e);
    if (router.asPath === '/charge-input') {
      setIsBrowser(false);
      router.push(`/`);
    }
  };
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
          <Link href={`?`} as="/charge-input">
            <a
              className={`nav__button--add nav__item ${
                router.asPath === '/charge-input' ? 'nav-input--active' : ''
              }`}
              aria-label="add new charge"
              onClick={!isBrowser}
            >
              
            </a>
          </Link>
        </li>
        <li
          className={`nav__item ${
            router.pathname === '/community' ? 'nav--active' : ''
          }`}
        >
          <Link href="/community">
            <a>Community</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
