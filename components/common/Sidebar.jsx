import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LogoImage from './LogoImage';
import Link from 'next/link';
import { FiGrid, FiHeart } from 'react-icons/fi';
import {
  FaGift,
  FaHouseUser,
  FaQuestionCircle,
  FaUber,
  FaUser,
} from 'react-icons/fa';

const sideMenu = [
  {
    title: 'Home',
    to: '/user/dashboard',
    icon: <FiGrid />,
    footer: true,
  },
  {
    title: 'My Portfolio',
    to: '/user/portfolio',
    icon: <FiHeart />,
    footer: true,
  },
  {
    title: 'Transaction',
    to: '/user/transactions',
    icon: <FaGift />,
    footer: false,
  },
  {
    title: 'Just For You',
    to: '/user/just-for-you',
    icon: <FaHouseUser />,
    footer: true,
  },
  {
    title: 'Services',
    to: '/user/service',
    icon: <FaQuestionCircle />,
    footer: false,
  },
  {
    title: 'Settings',
    to: '/user/settings',
    icon: <FaUser />,
    footer: false,
  },
  {
    title: 'Refer to Earn',
    to: '/user/refer-and-earn',
    icon: <FaUber />,
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
