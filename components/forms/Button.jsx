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
  wide,
  ...props
}) => {
  const isLink = !!href;
  const wideClassName = 'px-5 py-4';
  const btnClassName = classNames('btn', `btn-${color}`, className, {
    [wideClassName]: wide,
  });
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
  wide: PropTypes.bool,
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
  wide: false,
};

export default Button;
