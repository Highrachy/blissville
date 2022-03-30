import React from 'react';
import PropTypes from 'prop-types';
import { Spinner as BSpinner } from 'react-bootstrap';

const Spinner = ({ small }) => (
  <BSpinner
    as="span"
    animation="border"
    role="status"
    aria-hidden="true"
    size={small ? 'sm' : 'lg'}
  />
);

Spinner.propTypes = {
  small: PropTypes.bool,
};

Spinner.defaultProps = {
  small: false,
};

export default Spinner;
