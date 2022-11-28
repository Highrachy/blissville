import { isFestivePeriod } from '@/utils/helpers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const LogoImage = () => {
  return (
    <Link href="/" passHref>
      {isFestivePeriod() ? (
        <Image
          src="/assets/img/xmas_logo.png"
          alt="blissville logo"
          width={147}
          height={55}
        />
      ) : (
        <Image
          src="/assets/img/logo.png"
          alt="blissville logo"
          width={147}
          height={46}
        />
      )}
    </Link>
  );
};

export default LogoImage;
