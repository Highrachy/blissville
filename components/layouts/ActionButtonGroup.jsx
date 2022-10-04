import React from 'react';
import { KeyIcon, PhoneIcon } from '@/components/Icons/Icons';
import ActionButton from '@/components/common/ActionButton';
import { moneyFormatInNaira } from '@/utils/helpers';

const ActionButtonGroup = ({ price = 35_000_000 }) => {
  return (
    <div className="d-flex">
      <ActionButton
        color="primary"
        Icon={<KeyIcon />}
        topText="Prices From"
        bottomText={moneyFormatInNaira(price)}
        href="#"
      />
      <ActionButton
        color="secondary"
        Icon={<PhoneIcon />}
        topText="Call Now"
        bottomText="0802-833-7440"
        href="tel:08028337440"
      />
    </div>
  );
};

export default ActionButtonGroup;
