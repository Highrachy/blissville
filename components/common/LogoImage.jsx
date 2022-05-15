import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Navbar } from 'react-bootstrap';

const LogoImage = () => {
  return (
    <Link href="/" passHref>
      <Navbar.Brand>
        <Image
          src="/assets/img/logo.png"
          alt="blissville logo"
          width={147}
          height={46}
        />
      </Navbar.Brand>
    </Link>
  );
};

export default LogoImage;
