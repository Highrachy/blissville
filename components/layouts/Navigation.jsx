import navigation from '@/data/navigation';
import React, { useContext } from 'react';
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from 'react-bootstrap';
import ActiveLink from '../utils/ActiveLink';
import useWindowSize from '@/hooks/useWindowSize';
import { UserContext } from 'context/user';
import axios from 'axios';
import { getTokenFromStore } from '@/utils/localStorage';
import { UserProfileNav } from '../admin/Backend';
import LogoImage from '../common/LogoImage';

const DesktopNavigation = ({ MENU }) => {
  return (
    <>
      <Navbar.Collapse id="blissville-navbar">
        <Nav className="ms-auto">{MENU}</Nav>
      </Navbar.Collapse>
    </>
  );
};

const MobileNavigation = ({ MENU }) => (
  <>
    <Navbar.Offcanvas
      id="blissville-navbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="end"
    >
      <Offcanvas.Header className="border-bottom" closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{MENU}</Offcanvas.Body>
    </Navbar.Offcanvas>
  </>
);

const Navigation = ({ parentPage, navigation: navData = navigation }) => {
  const { width } = useWindowSize();
  const isDesktop = width > 991;
  const { loginUser, user } = useContext(UserContext);

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
        if (response.status === 200) {
          loginUser(response.data);
        }
      } catch (error) {}
    }
    if (token) {
      confirmPreviousLogin();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const MENU = navData.map(
    ({ children = {}, url, title, component = null }, index) => {
      const isSignedInUser = !!user?.id;
      if (component) {
        return <Nav.Item key={index}>{component}</Nav.Item>;
      }
      return (
        <React.Fragment key={index}>
          {Object.keys(children)?.length > 0 ? (
            <NavDropdown
              title={title}
              id={`${url}-dropdown`}
              active={parentPage === url}
            >
              {Object.entries(children).map(([url, title], index) => (
                <ActiveLink
                  key={`${url}-dropdown-${index}`}
                  href={`/${url}`}
                  passHref
                >
                  <NavDropdown.Item>{title}</NavDropdown.Item>
                </ActiveLink>
              ))}
            </NavDropdown>
          ) : title?.toLowerCase() === 'login' && isSignedInUser ? (
            <UserProfileNav user={user} isPublicPage />
          ) : (
            <ActiveLink href={`/${url}`} passHref>
              <Nav.Link aria-current="page" className={`nav-url`}>
                {title}
              </Nav.Link>
            </ActiveLink>
          )}
        </React.Fragment>
      );
    }
  );

  const currentNavigation = isDesktop ? (
    <DesktopNavigation MENU={MENU} />
  ) : (
    <MobileNavigation MENU={MENU} />
  );

  return (
    <>
      <Navbar bg="white" expand="lg" className="show">
        <Container>
          <Navbar.Brand>
            <LogoImage />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="blissville-navbar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z" />
            </svg>
          </Navbar.Toggle>
          {currentNavigation}
        </Container>
      </Navbar>
    </>
  );
};

export const TopNav = () => (
  <section className="bg-top-nav top-nav">
    <div className="container">
      <div className="row py-4">
        <div className="col-sm-6 powered-by">
          Powered by {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/highrachy-logo.png"
            alt="highrachy logo"
            width={76}
            height={23}
            className="d-inline"
          />
        </div>
        <div className="col-sm-6 contact">
          <div className="text-end">
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.79209 1.66772C6.14216 1.56218 6.51781 1.57971 6.85652 1.71741C7.19524 1.85511 7.47657 2.10466 7.65369 2.42452L7.71289 2.54372L8.24249 3.72052C8.40322 4.07771 8.45539 4.47427 8.39252 4.86087C8.32965 5.24748 8.15451 5.60707 7.88889 5.89492L7.78249 6.00052L6.94809 6.77892C6.79769 6.92132 6.91049 7.47252 7.45449 8.41492C7.94409 9.26292 8.34249 9.65892 8.53849 9.68052H8.57289L8.61529 9.67252L10.2553 9.17092C10.4757 9.10333 10.7109 9.10065 10.9328 9.16322C11.1547 9.22578 11.3539 9.35094 11.5065 9.52372L11.5793 9.61572L12.6649 11.1197C12.8777 11.4145 12.9837 11.773 12.9655 12.1361C12.9473 12.4992 12.806 12.8453 12.5649 13.1173L12.4673 13.2181L12.0337 13.6293C11.6443 13.9981 11.1573 14.2472 10.6304 14.3472C10.1036 14.4472 9.55907 14.3938 9.06169 14.1933C7.51369 13.5693 6.10729 12.1437 4.82969 9.93092C3.54969 7.71252 3.01769 5.77892 3.25529 4.12292C3.32719 3.62234 3.53332 3.15057 3.8518 2.75772C4.17028 2.36487 4.5892 2.06561 5.06409 1.89172L5.21849 1.84052L5.79209 1.66772Z"
                fill="#3A4451"
              />
            </svg>
            <strong>0905 555 5146</strong>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Navigation;
