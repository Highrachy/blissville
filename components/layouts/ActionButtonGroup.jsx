import React from 'react';
import { KeyIcon, PhoneIcon } from '@/components/Icons/Icons';
import ActionButton from '@/components/common/ActionButton';
import { moneyFormatInNaira } from '@/utils/helpers';
import { PHONE_NUMBER } from '@/utils/constants';

const ActionButtonGroup = ({ price = 35_000_000, href = '#' }) => {
  return (
    <div className="d-flex">
      <ActionButton
        color="primary"
        Icon={<KeyIcon />}
        topText="Prices From"
        bottomText={moneyFormatInNaira(price)}
        href={href}
      />
      <ActionButton
        color="secondary"
        Icon={<PhoneIcon />}
        topText="Call Now"
        bottomText={PHONE_NUMBER.OFFICIAL}
        href={PHONE_NUMBER.HREF}
      />
    </div>
  );
};

export default ActionButtonGroup;
