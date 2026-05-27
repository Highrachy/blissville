import { isFestivePeriod } from '@/utils/helpers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTheme } from 'context/ThemeContext';

const LogoImage = () => {
  const { theme } = useTheme();
  return (
    <Link href="/" passHref>
      <a aria-label="Blissville Home">
        {isFestivePeriod() ? (
          <Image
            src="/assets/img/xmas/logo.svg"
            alt="blissville logo"
            width={218}
            height={74}
          />
        ) : (
          <Image
            src={theme === 'dark' ? '/assets/img/logo-dark.png' : '/assets/img/logo.png'}
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
