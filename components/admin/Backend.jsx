import useWindowSize from '@/hooks/useWindowSize';
import { USER_ROLES } from '@/utils/constants';
import { getMenuStateFromStore } from '@/utils/localStorage';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Sidebar from './Sidebar';
import TopTitle from './TopTitle';

const Backend = ({ children, role = USER_ROLES.USER, title }) => {
  const { width } = useWindowSize();
  const isDesktop = width > 991;

  const menuState = getMenuStateFromStore();

  const [isFolded, setIsFolded] = React.useState(true);
  React.useEffect(() => {
    isDesktop && setIsFolded(menuState);
  }, [menuState, isDesktop]);

  return (
    <section className="admin-container">
      <Sidebar
        isFolded={isFolded}
        setIsFolded={setIsFolded}
        isDesktop={isDesktop}
        role={role}
      />
      <div
        className={`content-wrapper px-3 px-md-5 py-md-5 py-2 min-vh-100 bg-gray ${
          isFolded ? 'content-folded' : ''
        }`}
      >
        {!isDesktop && (
          <div className="d-flex d-md-none justify-content-between pb-2 border-bottom mt-3 mb-4">
            <Link href="/" passHref>
              <a>
                <Image
                  src="/assets/img/logo.png"
                  alt="blissville logo"
                  width={147}
                  height={46}
                />
              </a>
            </Link>
            <div
              className="btn-link img-md"
              onClick={() => setIsFolded(!isFolded)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z" />
              </svg>
            </div>
          </div>
        )}

        {title && <TopTitle>{title}</TopTitle>}
        <div className="container-fluid">{children}</div>
      </div>
    </section>
  );
};
export default Backend;
