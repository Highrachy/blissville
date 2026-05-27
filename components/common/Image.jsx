import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import queryString from 'query-string';

// https://github.com/lijinke666/react-image-process/blob/abf8db4b81a22cab2a12c2786718ce0029696401/example/example.js

const Image = ({
  src,
  defaultImage,
  name = 'Image',
  className,
  bordered,
  responsiveImage,
  rounded,
  circle,
  options,
  serveImageFromCloud,
  ...otherProps
}) => {
  const IMAGE_SERVE_URL = 'https://images.weserv.nl';

  const query = {
    url: src,
    q: 80,
    output: 'webp',
    ...options,
  };

  const isAbsolute = src && (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//'));

  const imgSrc = isAbsolute
    ? `${IMAGE_SERVE_URL}?${queryString.stringify(query)}`
    : src || defaultImage;

  const classes = classNames(
    className,
    {
      'img-fluid': responsiveImage,
    },
    {
      'img-thumbnail': bordered,
    },
    {
      rounded: rounded,
    },
    {
      'rounded-circle': circle,
    }
  );

  const safeName = name ? name.slice(0, 80) : 'Image';

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={safeName}
      className={classes}
      src={serveImageFromCloud ? imgSrc : (src || defaultImage)}
      title={safeName}
      width={otherProps.width || 600}
      height={otherProps.height || 400}
      {...otherProps}
    />
  );
};

Image.propTypes = {
  bordered: PropTypes.bool,
  className: PropTypes.string,
  defaultImage: PropTypes.any,
  name: PropTypes.string,
  options: PropTypes.object,
  responsiveImage: PropTypes.bool,
  rounded: PropTypes.bool,
  serveImageFromCloud: PropTypes.bool,
  src: PropTypes.string,
};

Image.defaultProps = {
  bordered: false,
  className: '',
  defaultImage: '/assets/img/placeholder/image.png',
  options: {},
  responsiveImage: true,
  rounded: false,
  serveImageFromCloud: true,
  src: null,
};

// eslint-disable-next-line jsx-a11y/alt-text
export const LocalImage = (props) => <Image {...props} />;

export default Image;
