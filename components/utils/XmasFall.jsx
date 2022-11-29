import React from 'react';
import Snowfall from 'react-snowfall';
import { isFestivePeriod } from '@/utils/helpers';
import Image from 'next/image';

const XmasFall = () => {
  let images = null;
  if (process.browser) {
    const snowflake1 = window.document.createElement('img');
    const snowflake2 = window.document.createElement('img');
    const snowflake3 = window.document.createElement('img');
    const snowflake4 = window.document.createElement('img');
    const snowflake5 = window.document.createElement('img');
    snowflake1.src = '/assets/img/xmas/star1.png';
    snowflake2.src = '/assets/img/xmas/star2.png';
    snowflake3.src = '/assets/img/xmas/star3.png';
    snowflake4.src = '/assets/img/xmas/candy-bar.png';
    snowflake5.src = '/assets/img/xmas/sweet.png';
    images = [snowflake1, snowflake2, snowflake3, snowflake4, snowflake5];
  }
  return (
    isFestivePeriod() &&
    process.browser && (
      <>
        <Snowfall
          snowflakeCount={30}
          rotationSpeed={[0, 0.2]}
          speed={[0.008, 0.1]}
          wind={[0.005, 0.1]}
          radius={[10, 20]}
          style={{
            opacity: 0.3,
            zIndex: 9999,
          }}
          images={images}
        />
      </>
    )
  );
};

export default XmasFall;
