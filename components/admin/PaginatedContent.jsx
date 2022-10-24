import React from 'react';
import Humanize from 'humanize-plus';
import { ContentLoader } from 'components/utils/LoadingItems';
import TopTitle from './TopTitle';
import { FiUser } from 'react-icons/fi';
import Pagination from '../utils/Pagination';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import TopFilter from './TopFilter';
import Button from '@/components/forms/Button';
import { useFilter } from '@/hooks/useFilter';

const PaginatedContent = ({
  addNewUrl,
  axiosOptions,
  childrenKey,
  DataComponent,
  initialFilter = {},
  filterFields,
  limit,
  PageIcon,
  pageName,
  params,
  pluralPageName,
  populate,
  sort,
  endpoint,
  hidePagination,
  hideNoContent,
  hideTitle,
  showFetching,
  ...props
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const pluralizePageName = pluralPageName || Humanize.pluralize(2, pageName);
  const Icon = PageIcon || <FiUser />;

  const filterOutput = useFilter(
    initialFilter,
    filterFields,
    pluralizePageName
  );
  const {
    filterName,
    filterQuery,
    hasFilter,
    filterLoadingText,
    filterNoContentText,
  } = filterOutput;

  const [query, results] = useSWRQuery({
    name: [
      'paginated',
      ...(hasFilter ? [filterName] : []),
      pageName.toLowerCase(),
      currentPage,
    ],
    endpoint,
    axiosOptions: {
      params: {
        'pagination[page]': currentPage,
        'pagination[pageSize]': limit || 10,
        sort: sort || 'createdAt:desc',
        populate: populate || '*',
        ...params,
        ...filterQuery,
      },
      ...axiosOptions,
    },
    ...props,
  });

  const pagination = query?.data?.meta?.pagination;
  const offset = (currentPage - 1) * (pagination?.pageSize || 0);

  const showTitle = !hideTitle && !(hideNoContent && results?.length === 0);
  const noContentText = `No ${pageName} found`;
  const loadingText = `Loading ${pageName}`;

  return (
    <>
      {showTitle && (
        <TopTitle buttonText={`New ${pageName}`} to={addNewUrl}>
          {pagination?.total}{' '}
          {Humanize.pluralize(pagination?.total, pageName, pluralizePageName)}
        </TopTitle>
      )}

      <ContentLoader
        Icon={Icon}
        name={pageName}
        noContentText={hasFilter ? filterNoContentText : noContentText}
        hideNoContent={hideNoContent}
        query={query}
        results={results}
        showFetching={showFetching}
        loadingText={hasFilter ? filterLoadingText : loadingText}
      >
        <TopFilter
          pageName={pageName}
          filterFields={filterFields}
          filterOutput={filterOutput}
        />
        <DataComponent
          results={results || []}
          query={query}
          offset={offset}
          {...props}
        />

        {!hidePagination && (
          <Pagination
            currentPage={pagination?.page}
            lastPage={pagination?.pageCount}
            setCurrentPage={setCurrentPage}
          />
        )}
      </ContentLoader>
    </>
  );
};

export default PaginatedContent;
