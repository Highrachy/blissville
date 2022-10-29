import React from 'react';
import Axios, { CancelToken } from 'axios';
import { getError, statusIsSuccessful } from 'utils/helpers';
import { getTokenFromStore } from 'utils/localStorage';
import { toast } from 'react-toastify';
import useSWR from 'swr';

const fetchQuery =
  ({ currentEndpoint, axiosOptions }) =>
  async () => {
    const source = CancelToken.source();

    // Slow down request
    // await new Promise((resolve) => setTimeout(resolve, 10_000));
    const promise = Axios.get(currentEndpoint, {
      cancelToken: source.token,
      headers: {
        Authorization: getTokenFromStore(),
      },
      ...axiosOptions,
    })
      .then((res) => {
        if (statusIsSuccessful(res.status)) {
          return res?.data;
        }
        toast.error('Request was not successful. Please try again later');
      })
      .catch((error) => {
        toast.error(getError(error));
      });

    promise.cancel = () => {
      toast.error('Query was cancelled');
      source.cancel('Query was cancelled');
    };
    return promise;
  };

const getQueryOptions = (queryOptions = {}) => ({
  revalidateIfStale: true, // automatically revalidate even if there is stale data
  revalidateOnFocus: false, // automatically revalidate when window gets focused
  revalidateOnReconnect: true, // automatically revalidate when the browser regains a network connection
  refreshInterval: 0, // disable refresh
  onError: (error, key) => {
    if (error.status !== 403 && error.status !== 404) {
      // We can send the error to Sentry,
      // or show a notification UI.
      toast.error(getError(error));
    }
  },
  ...queryOptions,
});

export const useSWRQuery = ({
  name,
  endpoint,
  key = 'data',
  queryOptions = {},
  axiosOptions = {},
  showQuery,
  showResult,
  showLogs = true,
}) => {
  const currentEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;

  const queryResult = useSWR(
    name,
    fetchQuery({
      currentEndpoint,
      axiosOptions,
    }),
    getQueryOptions(queryOptions)
  );

  const result = queryResult?.data?.[key] || queryResult?.data || [];

  (showLogs || showQuery) &&
    console.info(`%c[${name}] Query: `, 'color: blue', queryResult);
  (showLogs || showResult) &&
    console.info(`%c[${name}] Result: `, 'color: green', result);

  return [queryResult, result];
};
