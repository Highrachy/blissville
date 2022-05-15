import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LogoImage from './LogoImage';
import Link from 'next/link';
import { RiHome5Fill } from 'react-icons/ri';
import { IoWallet } from 'react-icons/io5';
import { ImUsers } from 'react-icons/im';
import { MdMessage } from 'react-icons/md';
import { FaGift, FaTachometerAlt } from 'react-icons/fa';

const sideMenu = [
  {
    title: 'Home',
    to: '/user/dashboard',
    icon: <FaTachometerAlt />,
    footer: true,
  },
  {
    title: 'My Portfolio',
    to: '/user/portfolio',
    icon: <RiHome5Fill />,
    footer: true,
  },
  {
    title: 'Payments',
    to: '/user/payments',
    icon: <IoWallet />,
    footer: false,
  },
  {
    title: 'Forum',
    to: '/user/just-for-you',
    icon: <ImUsers />,
    footer: true,
  },
  {
    title: 'Refer to Earn',
    to: '/user/refer-and-earn',
    icon: <FaGift />,
    footer: true,
  },
  {
    title: 'Reviews',
    to: '/user/refer-and-earn',
    icon: <MdMessage />,
    footer: true,
  },
];

const Sidebar = ({ showSidebar, closeSidebar, ...props }) => {
  return (
    <>
      <div
        className={classNames('backdrop', {
          showSidebar,
        })}
        onClick={closeSidebar}
      />
      <aside
        className={classNames('sidebar', {
          showSidebar,
        })}
      >
        <div className="sidebar__logo">
          <LogoImage />
          <div className="sidebar__close" onClick={closeSidebar}>
            <button
              aria-label="Close"
              className="close d-block d-sm-none"
              type="button"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>

        <SidebarNavigation closeSidebar={closeSidebar} menus={sideMenu} />

        <div className="clearfix" />
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
  showSidebar: PropTypes.bool.isRequired,
};

const SidebarNavigation = ({ menus, closeSidebar }) => {
  const sideMenu = menus && (
    <ul className="sidebar-menu">
      {menus.map(({ title, to, icon }) => (
        <li key={title}>
          <Link href={to} passHref>
            <a className="sidebar-menu__item">
              <span className="sidebar__icon">{icon}</span> &nbsp;
              {title}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
  return <div>{sideMenu}</div>;
};

SidebarNavigation.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
  menus: PropTypes.array.isRequired,
};

const isActive = ({ isCurrent }) => {
  return isCurrent
    ? { className: 'sidebar-menu__item active' }
    : { className: 'sidebar-menu__item' };
};

export default Sidebar;
