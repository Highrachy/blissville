import React from 'react';
import { KeyIcon, PhoneIcon } from '@/components/Icons/Icons';
import ActionButton from '@/components/common/ActionButton';

const ActionButtonGroup = () => {
  return (
    <div className="d-flex">
      <ActionButton
        color="primary"
        Icon={<KeyIcon />}
        topText="Prices From"
        bottomText="₦35,000,000"
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
