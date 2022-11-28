import useWindowSize from '@/hooks/useWindowSize';
import { ROLE_NAME, USER_ROLES } from '@/utils/constants';
import {
  getMenuStateFromStore,
  getPermissionFromStore,
  getTokenFromStore,
} from '@/utils/localStorage';
import axios from 'axios';
import { UserContext } from 'context/user';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { LocalImage } from '../common/Image';
import Sidebar from './Sidebar';
import TopTitle from './TopTitle';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogoImage from '../common/LogoImage';
const Backend = ({ children, role = USER_ROLES.USER, title }) => {
  const { width } = useWindowSize();
  const isDesktop = width > 991;

  const menuState = getMenuStateFromStore();

  const [isFolded, setIsFolded] = React.useState(true);
  const { logoutUser, loginUser, user } = useContext(UserContext);
  const router = useRouter();
  const token = getTokenFromStore(true);

  React.useEffect(() => {
    async function confirmPreviousLogin() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
          {
            headers: {
              Authorization: getTokenFromStore(),
            },
          }
        );
        if (response.status !== 200) {
          router.push('/app');
        } else {
          loginUser(response.data);
        }
      } catch (error) {
        logoutUser();
        router.push('/app');
      }
    }
    if (!token) {
      router.push('/app');
      logoutUser();
    } else {
      confirmPreviousLogin();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  React.useEffect(() => {
    isDesktop && setIsFolded(menuState);
  }, [menuState, isDesktop]);

  const currentRole = user?.permission || getPermissionFromStore() || role;

  if (!user) {
    return <p> Loading... </p>;
  }

  return (
    <section className="admin-container">
      <Sidebar
        isFolded={isFolded}
        setIsFolded={setIsFolded}
        isDesktop={isDesktop}
        role={currentRole}
      />
      <div
        className={`content-wrapper px-3 px-md-5 py-2 min-vh-100 bg-gray ${
          isFolded ? 'content-folded' : ''
        }`}
      >
        {!isDesktop && (
          <div className="d-flex d-md-none justify-content-between pb-2 border-bottom mt-3 mb-4">
            <LogoImage />
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

        <TopNav user={user} />

        {title && <TopTitle>{title}</TopTitle>}
        <div className="container-fluid">{children}</div>
      </div>
    </section>
  );
};

const TopNav = ({ user }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="top-nav-bar" />
        <Navbar.Collapse id="top-nav-bar">
          <Nav className="ms-auto">
            <UserProfileNav user={user} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export const UserProfileNav = ({ user, isPublicPage = false }) => {
  const { logoutUser } = useContext(UserContext);
  if (!user) {
    return;
  }
  return (
    <NavDropdown
      id="nav-dropdown-dark-example"
      title={
        <>
          <LocalImage
            src={user?.profileImage}
            alt="Logo"
            className={`${isPublicPage ? 'img-md' : 'img-md2'} me-2`}
            rounded
          />
          <span className="text-xs">
            {user?.firstName} {user?.lastName}
          </span>
        </>
      }
    >
      <NavDropdown.Item href={`/app/${ROLE_NAME[user?.permission]}/dashboard`}>
        My Dashboard
      </NavDropdown.Item>
      <NavDropdown.Item
        href={`/app/${ROLE_NAME[user?.permission]}/my-properties`}
      >
        My Properties
      </NavDropdown.Item>
      <NavDropdown.Item
        href={`/app/${ROLE_NAME[user?.permission]}/transactions`}
      >
        Transactions
      </NavDropdown.Item>
      <NavDropdown.Item onClick={() => logoutUser()}>Logout</NavDropdown.Item>
    </NavDropdown>
  );
};
export default Backend;
