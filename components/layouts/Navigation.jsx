import navigation from '@/data/navigation';
import React, { useContext, useState, useEffect } from 'react';
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import ActiveLink from '../utils/ActiveLink';
import { UserContext } from 'context/user';
import axios from 'axios';
import { getTokenFromStore } from '@/utils/localStorage';
import { UserProfileNav } from '../admin/Backend';
import LogoImage from '../common/LogoImage';
import { PHONE_NUMBER, PHONE_NUMBER_ALT } from '@/utils/constants';

const Navigation = ({ parentPage, navigation: navData = navigation }) => {
  const { loginUser, user } = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false);

  const token = getTokenFromStore(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
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

  const isSignedInUser = !!user?.id;

  const MENU = navData.map(
    ({ children = {}, url, title, component = null }, index) => {
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
              {Object.entries(children).map(([childUrl, childTitle], idx) => {
                const childHref = childUrl.includes('#')
                  ? childUrl
                  : `/${childUrl}`;
                return childUrl.includes('#') ? (
                  <NavDropdown.Item
                    key={`${childUrl}-dropdown-${idx}`}
                    as="a"
                    href={childHref}
                  >
                    {childTitle}
                  </NavDropdown.Item>
                ) : (
                  <ActiveLink
                    key={`${childUrl}-dropdown-${idx}`}
                    href={childHref}
                    passHref
                  >
                    <NavDropdown.Item>{childTitle}</NavDropdown.Item>
                  </ActiveLink>
                );
              })}
            </NavDropdown>
          ) : title?.toLowerCase() === 'contact us' ? (
            <ActiveLink href={`/${url}`} passHref>
              <Nav.Link aria-current="page" className="nav-btn-cta nav-url">
                {title}
              </Nav.Link>
            </ActiveLink>
          ) : url.includes('#') ? (
            <a href={url} key={index} className="nav-url nav-link">
              {title}
            </a>
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

  return (
    <>
      <header className={`header-wrapper ${scrolled ? 'header-scrolled' : ''}`}>
        {/* <TopNav /> */}
        <Navbar expand="lg" className={`navbar-main show ${scrolled ? 'navbar-scrolled' : ''}`}>
          <Container>
            <Navbar.Brand>
              <LogoImage />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="blissville-navbar" className="navbar-toggler">
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </Navbar.Toggle>
            <Navbar.Collapse id="blissville-navbar">
              <Nav className="ms-auto align-items-center">
                {MENU}
                {isSignedInUser && <UserProfileNav user={user} isPublicPage />}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export const TopNav = () => (
  <section className="bg-top-nav top-nav">
    <div className="container">
      <div className="d-flex justify-content-between align-items-center py-2 contact-bar-inner">
        <div className="powered-by d-flex align-items-center">
          <span className="me-1">Powered by</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/highrachy-logo.png"
            alt="highrachy logo"
            width={76}
            height={23}
            className="d-inline"
          />
        </div>
        <div className="contact d-flex align-items-center">
          <svg
            width={14}
            height={14}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="me-1"
          >
            <path
              d="M5.79209 1.66772C6.14216 1.56218 6.51781 1.57971 6.85652 1.71741C7.19524 1.85511 7.47657 2.10466 7.65369 2.42452L7.71289 2.54372L8.24249 3.72052C8.40322 4.07771 8.45539 4.47427 8.39252 4.86087C8.32965 5.24748 8.15451 5.60707 7.88889 5.89492L7.78249 6.00052L6.94809 6.77892C6.79769 6.92132 6.91049 7.47252 7.45449 8.41492C7.94409 9.26292 8.34249 9.65892 8.53849 9.68052H8.57289L8.61529 9.67252L10.2553 9.17092C10.4757 9.10333 10.7109 9.10065 10.9328 9.16322C11.1547 9.22578 11.3539 9.35094 11.5065 9.52372L11.5793 9.61572L12.6649 11.1197C12.8777 11.4145 12.9837 11.773 12.9655 12.1361C12.9473 12.4992 12.806 12.8453 12.5649 13.1173L12.4673 13.2181L12.0337 13.6293C11.6443 13.9981 11.1573 14.2472 10.6304 14.3472C10.1036 14.4472 9.55907 14.3938 9.06169 14.1933C7.51369 13.5693 6.10729 12.1437 4.82969 9.93092C3.54969 7.71252 3.01769 5.77892 3.25529 4.12292C3.32719 3.62234 3.53332 3.15057 3.8518 2.75772C4.17028 2.36487 4.5892 2.06561 5.06409 1.89172L5.21849 1.84052L5.79209 1.66772Z"
              fill="#3A4451"
            />
          </svg>
          <span className="phone-numbers">
            <a href={PHONE_NUMBER.HREF} className="text-reset text-decoration-none phone-link">
              <strong>{PHONE_NUMBER.OFFICIAL}</strong>
            </a>
            <span className="phone-sep d-none d-md-inline"> | </span>
            <a href={PHONE_NUMBER_ALT.HREF} className="text-reset text-decoration-none phone-link d-none d-md-inline">
              <strong>{PHONE_NUMBER_ALT.OFFICIAL}</strong>
            </a>
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default Navigation;
