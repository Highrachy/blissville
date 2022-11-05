import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/utils/Spinner';
import NoContent from '../admin/NoContent';
import { isObject } from '@/utils/helpers';

const LoadItems = ({ items, children, loadingText, noContent, Icon, size }) => {
  if (items == null) {
    return <Loading size={size} text={loadingText} Icon={Icon} />;
  }
  if (items.length > 0) {
    return children;
  }

  return noContent;
};

LoadItems.propTypes = {
  children: PropTypes.any,
  Icon: PropTypes.any,
  items: PropTypes.array,
  loadingText: PropTypes.string,
  noContent: PropTypes.any.isRequired,
  size: PropTypes.string,
};

LoadItems.defaultProps = {
  children: null,
  Icon: null,
  loadingText: null,
  items: null,
  size: null,
};

export const Loading = ({ Icon, text, size }) => (
  <div
    className={`text-center mt-6 w-100 loading-icon icon-xl text-muted ${
      size ? size : ''
    }`}
  >
    {Icon && Icon}
    {text && <h5 className="my-4 text-muted">{text} &nbsp;</h5>}
    <Spinner small={size === 'small'} />{' '}
  </div>
);

export const ContentLoader = ({
  children,
  query,
  results,
  Icon,
  loadingText,
  noContentText,
  hideNoContent,
  showFetching = false,
  name,
}) => {
  const hasContent = Array.isArray(results)
    ? results?.length > 0
    : isObject(results)
    ? Object.keys(results).length > 0
    : !!results;
  console.log('hasContent', hasContent);

  return (
    <>
      {query?.isValidating && hasContent && showFetching && (
        <div className="updating-spinner">
          <Spinner small />
        </div>
      )}
      {results === undefined && query?.isValidating ? (
        <Loading text={loadingText || `Loading ${name}`} Icon={Icon} />
      ) : hasContent ? (
        children
      ) : (
        !hideNoContent && (
          <NoContent text={noContentText || `${name} not found`} Icon={Icon} />
        )
      )}
    </>
  );
};
export default LoadItems;
