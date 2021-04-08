import React from 'react';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <Link href="/">
          <li className="nav__item">Feed</li>
        </Link>
        <li className="">
          {' '}
          <button
            className="button--add nav__item"
            onClick={() => console.log('clicked')}
            aria-label="add new charge"
          >
          </button>
        </li>
        <Link href="/community">
          <li className="nav__item">Community</li>
        </Link>
      </ul>
    </nav>
  );
}
