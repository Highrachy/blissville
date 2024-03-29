import { adminMenu, userMenu } from '@/data/admin/sideMenu';
import { ROLE_NAME, USER_ROLES } from '@/utils/constants';
import { storeMenuState } from '@/utils/localStorage';
import classNames from 'classnames';
import { UserContext } from 'context/user';
import { Logout } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import LogoImage from '../common/LogoImage';

const Sidebar = ({ isFolded, setIsFolded, isDesktop, role }) => {
  const currentSideMenu =
    role.toString() === USER_ROLES.ADMIN ? adminMenu : userMenu;
  const router = useRouter();
  const { logoutUser } = useContext(UserContext);

  const handleMenuState = () => {
    const newState = !isFolded;
    setIsFolded(newState);
    isDesktop && storeMenuState(newState);
  };

  return (
    <div className={` ${isFolded ? 'sidebar-folded' : 'sidebar-open'}`}>
      <nav className="dashboard-sidebar">
        <div className="sidebar-header">
          {!isFolded &&
            (isDesktop ? <LogoImage /> : <h5 className="text-dark">Menu</h5>)}
          <div
            className={`sidebar-toggler ${!isDesktop ? 'icon-md' : ''}`}
            onClick={handleMenuState}
          >
            {isFolded ? <FiMenu /> : <FiX />}
          </div>
        </div>
        <div className="sidebar-body">
          <ul className="nav">
            {Object.entries(currentSideMenu).map(([title, icon], index) => {
              const currentPath = `/app/${
                ROLE_NAME[role]?.toLowerCase() || 'user'
              }/${changeSpaceToDash(title)}`;
              const currentPathSplit = router.pathname.split('/')[3];
              const isCurrentPage =
                changeSpaceToDash(title) === currentPathSplit;

              return (
                <li
                  key={index}
                  className={classNames('nav-item', {
                    active: isCurrentPage,
                  })}
                >
                  <Link href={currentPath} passHref>
                    <a className="nav-link">
                      <span className="link-icon">{icon}</span>
                      {!isFolded && <span className="link-title">{title}</span>}
                    </a>
                  </Link>
                </li>
              );
            })}
            <li key="logout" className="nav-item" onClick={() => logoutUser()}>
              <a href="#" className="nav-link">
                <span className="link-icon">
                  <Logout size="24" variant="Bulk" />
                </span>
                {!isFolded && <span className="link-title">Logout</span>}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

// function to change space to dash
const changeSpaceToDash = (str) => {
  return str.replace(/\s+/g, '-').toLowerCase();
};

export default Sidebar;
