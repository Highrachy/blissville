import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/forms/Button';
import { FiPlus } from 'react-icons/fi';

const TopTitle = ({ children, buttonText, to, href }) => {
  const link = to || href;
  return (
    <div className="mb-3">
      <h3 className="text-color position-relative">
        {children}
        {link && (
          <Button
            color="dark"
            href={link}
            className="position-absolute end-0 top-0"
          >
            {<FiPlus />}{' '}
            <span className="d-none d-sm-inline">{buttonText}</span>
          </Button>
        )}
      </h3>
    </div>
  );
};

TopTitle.propTypes = {
  buttonText: PropTypes.string,
  children: PropTypes.node.isRequired,
  to: PropTypes.any,
  href: PropTypes.any,
};

TopTitle.defaultProps = {
  buttonText: 'Add New',
  to: null,
  href: null,
};

export default TopTitle;
