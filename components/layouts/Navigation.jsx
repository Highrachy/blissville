import navigation from '@/data/navigation';
import React, { useContext, useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import ActiveLink from '../utils/ActiveLink';
import { UserContext } from 'context/user';
import axios from 'axios';
import { getTokenFromStore } from '@/utils/localStorage';
import { UserProfileNav } from '../admin/Backend';
import LogoImage from '../common/LogoImage';

const normalizeHref = (path = '') => {
  if (!path) return '/';
  if (path.includes('#')) {
    const [basePath, hash] = path.split('#');
    const normalizedBase = basePath
      ? `/${basePath.replace(/^\/+/, '').replace(/\/+/g, '/')}`
      : '';

    return `${normalizedBase || '/'}#${hash}`;
  }

  return `/${path.replace(/^\/+/, '').replace(/\/+/g, '/')}`;
};

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
          },
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
                const childHref = normalizeHref(childUrl);
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
            <ActiveLink href={normalizeHref(url)} passHref>
              <Nav.Link aria-current="page" className="nav-btn-cta nav-url">
                {title}
              </Nav.Link>
            </ActiveLink>
          ) : url.includes('#') ? (
            <a href={url} key={index} className="nav-url nav-link">
              {title}
            </a>
          ) : (
            <ActiveLink href={normalizeHref(url)} passHref>
              <Nav.Link aria-current="page" className={`nav-url`}>
                {title}
              </Nav.Link>
            </ActiveLink>
          )}
        </React.Fragment>
      );
    },
  );

  return (
    <>
      <header className={`header-wrapper ${scrolled ? 'header-scrolled' : ''}`}>
        <Navbar
          expand="lg"
          className={`navbar-main show ${scrolled ? 'navbar-scrolled' : ''}`}
        >
          <Container>
            <Navbar.Brand>
              <LogoImage />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="blissville-navbar"
              className="navbar-toggler"
            >
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

export default Navigation;
