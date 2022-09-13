import React from 'react';
import { KeyIcon, PhoneIcon } from '@/components/Icons/Icons';
import ActionButton from '@/components/common/ActionButton';

const ActionButtonGroup = () => {
  return (
    <>
      <p className="lead d-md-none text-md">
        <span className="text-uppercase">Prices From</span>{' '}
        <span className="fw-bold">₦35,000,000</span>
      </p>
      <ActionButton
        color="primary"
        Icon={<KeyIcon />}
        topText="Prices From"
        bottomText="₦35,000,000"
        href="#"
        className="d-none d-md-inline"
      />
      <ActionButton
        color="secondary"
        Icon={<PhoneIcon />}
        topText="Call Now"
        bottomText="0802-833-7440"
        href="tel:08028337440"
      />
    </>
  );
};

export default ActionButtonGroup;
