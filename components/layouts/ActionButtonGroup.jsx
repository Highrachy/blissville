import React from 'react';
import { KeyIcon, PhoneIcon } from '@/components/Icons/Icons';
import ActionButton from '@/components/common/ActionButton';
import { getPrice } from '@/utils/helpers';
import { PHONE_NUMBER, PHONE_NUMBER_ALT } from '@/utils/constants';

const ActionButtonGroup = ({
  price = 35_000_000,
  href = '#',
  useAltPhone = false,
}) => {
  return (
    <div className="d-flex">
      <ActionButton
        color="primary"
        Icon={<KeyIcon />}
        topText="Prices From"
        bottomText={getPrice(price)}
        href={href}
      />
      <ActionButton
        color="secondary"
        Icon={<PhoneIcon />}
        topText="Call Now"
        bottomText={
          useAltPhone ? PHONE_NUMBER_ALT.OFFICIAL : PHONE_NUMBER.OFFICIAL
        }
        href={useAltPhone ? PHONE_NUMBER_ALT.HREF : PHONE_NUMBER.HREF}
      />
    </div>
  );
};

export default ActionButtonGroup;
