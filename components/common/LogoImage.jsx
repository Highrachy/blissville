import { isFestivePeriod } from '@/utils/helpers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const LogoImage = () => {
  return (
    <Link href="/" passHref>
      <a>
        {isFestivePeriod() ? (
          <Image
            src="/assets/img/xmas/logo.svg"
            alt="blissville logo"
            width={218}
            height={74}
          />
        ) : (
          <Image
            src="/assets/img/logo.png"
            alt="blissville logo"
            width={171}
            height={47}
          />
        )}
      </a>
    </Link>
  );
};

export default LogoImage;
