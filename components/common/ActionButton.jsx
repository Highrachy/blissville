import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { COLOR_STYLE } from 'utils/constants';
import Spinner from 'components/utils/Spinner';
import Link from 'next/link';

const ActionButton = ({
  className,
  Icon,
  topText,
  bottomText,
  color,
  href,
  ...props
}) => {
  return (
    <Link href={href} passHref>
      <a
        role="button"
        {...props}
        className={classNames(
          'btn btn-action btn d-inline-flex align-items-center rounded-4',
          `btn-${color}`,
          className
        )}
      >
        <div className="me-md-3 me-2">{Icon}</div>
        <div className="d-flex flex-column">
          <div className="text-start text-uppercase">{topText}</div>
          <h5 className="text-white mb-0 text-nowrap">{bottomText}</h5>
        </div>
      </a>
    </Link>
  );
};

ActionButton.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(COLOR_STYLE),
  href: PropTypes.string,
};

ActionButton.defaultProps = {
  className: null,
  color: COLOR_STYLE[2],
  href: null,
};

export default ActionButton;
