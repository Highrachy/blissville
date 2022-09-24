import React from 'react';
import { DATA_TYPE } from '@/utils/constants';
import Button from '@/components/forms/Button';
import { MdRemoveCircle } from 'react-icons/md';

export const useFilter = (initialFilter, filterFields, pageName) => {
  const [filter, setFilter] = React.useState(initialFilter);
  const hasFilter = filter?.field && filter?.value;
  const currentFilterField = filterFields?.[filter.field];
  const currentFieldLabel = currentFilterField?.label || filter.field;
  const filteringText = (
    <em className="text-dark">
      {currentFieldLabel} =&nbsp;
      {currentFilterField?.type === DATA_TYPE.BOOLEAN
        ? filter.value === 'true'
          ? currentFilterField?.values?.[0]?.label || 'Yes'
          : currentFilterField?.values?.[1]?.label || 'No'
        : filter.value}
    </em>
  );

  const FILTER_SIGN = {
    [DATA_TYPE.STRING]: '$containsi',
    [DATA_TYPE.NUMBER]: '$constainsi',
    [DATA_TYPE.DATE]: '$eq',
    [DATA_TYPE.BOOLEAN]: '$eq',
  };

  const filterSign = FILTER_SIGN[currentFilterField?.type || DATA_TYPE.STRING];

  const filterQuery = hasFilter
    ? {
        [`filters[${filter.field}][${filterSign}]`]: filter.value,
      }
    : {};

  const filterNoContentText = (
    <div>
      No {pageName} found <br />
      <small>Currently filtered by {filteringText}</small>
      <br />
      <Button
        color="none"
        onClick={() => setFilter({})}
        className="btn-outline-dark btn-sm px-3 mt-4"
      >
        Back to All {pageName}
      </Button>
    </div>
  );

  const filterLoadingText = <div>Filtering by {filteringText}</div>;
  const activeFilterText = (
    <span className="text-info fw-bold px-3 py-2">
      Filtered by: {filteringText}
      &nbsp;&nbsp;
      <span className="filter-close-icon" onClick={() => setFilter({})}>
        <MdRemoveCircle />
      </span>
    </span>
  );

  const filterName = `${filter?.field || ''}-${filter?.value}`;

  return {
    filterName,
    filterQuery,
    filterLoadingText,
    filterNoContentText,
    activeFilterText,
    setFilter,
    hasFilter,
  };
};
