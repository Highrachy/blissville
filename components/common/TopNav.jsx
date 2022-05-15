import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { NotificationIcon, ProfileIcon } from 'components/Icons/Icons';
import Image from 'next/image';
import Link from 'next/link';

// eslint-disable-next-line react/display-name
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const TopNav = () => {
  return (
    <>
      <Navbar
        fixed="top"
        className="dashboard-top-nav d-flex align-items-center"
        bg="transparent"
        expand="lg"
      >
        <div className="container-fluid px-5">
          <Nav className="ms-auto d-flex flex-row align-items-center">
            <Link href={`/user/notifications`} passHref>
              <Nav.Link className="notifications icon-md">
                <NotificationIcon />
              </Nav.Link>
            </Link>

            <Link href={`/user/notifications`} passHref>
              <Nav.Link className="notifications icon-md">
                <ProfileIcon />
              </Nav.Link>
            </Link>

            <Dropdown>
              <Dropdown.Toggle as={CustomToggle} id="user-dropdown">
                <div className="d-flex ps-3">
                  <Image
                    src="/assets/img/avatars/profile.jpeg"
                    width="35"
                    height="35"
                    alt="Profile"
                    className="dashboard-top-nav__avatar"
                  />
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-children">
                <Link href="/" passHref>
                  <Dropdown.Item className="dropdown-item">
                    Badges
                  </Dropdown.Item>
                </Link>
                <Link href="/" passHref>
                  <Dropdown.Item
                    className="dropdown-item"
                    href={`/user/testimonials`}
                  >
                    Testimonials
                  </Dropdown.Item>
                </Link>
                <Link href="/" passHref>
                  <Dropdown.Item
                    className="dropdown-item"
                    href="/user/settings"
                  >
                    Settings
                  </Dropdown.Item>
                </Link>
                <Link href="/" passHref>
                  <Dropdown.Item className="dropdown-item" href="/logout">
                    Logout
                  </Dropdown.Item>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
            {/* <Nav.Link as={Link} to="/register"></Nav.Link> */}
          </Nav>
        </div>
      </Navbar>
    </>
  );
};

export default TopNav;
