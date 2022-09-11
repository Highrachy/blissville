import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/forms/Button';
import { FiPlus } from 'react-icons/fi';

const TopTitle = ({ children, buttonText, to }) => {
  return (
    <div className="container-fluid mb-2">
      <h3 className="text-color position-relative">
        {children}
        {buttonText && to && (
          <Button
            color="dark"
            href={to}
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
};

TopTitle.defaultProps = {
  buttonText: null,
  to: null,
};

export default TopTitle;
