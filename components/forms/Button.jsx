import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { COLOR_STYLE } from 'utils/constants';
import Spinner from 'components/utils/Spinner';
import Link from 'next/link';

const Button = ({
  className,
  loading,
  loadingText,
  showLoadingText,
  children,
  onClick,
  color,
  type,
  href,
  ...props
}) => {
  const isLink = !!href;
  const btnClassName = classNames('btn', `btn-${color}`, className);
  return isLink ? (
    <Link href={href} passHref>
      <a className={btnClassName} role="button" {...props}>
        {children}
      </a>
    </Link>
  ) : (
    <button className={btnClassName} onClick={onClick} type="button" {...props}>
      {loading ? (
        <>
          <Spinner small /> &nbsp;
          {showLoadingText && (loadingText || children)}
        </>
      ) : (
        children
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.oneOf(COLOR_STYLE),
  href: PropTypes.any,
  loading: PropTypes.bool,
  loadingText: PropTypes.any,
  showLoadingText: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: 'Submit',
  className: null,
  color: COLOR_STYLE[2],
  href: null,
  loading: false,
  loadingText: null,
  showLoadingText: true,
  onClick: () => {},
};

export default Button;
