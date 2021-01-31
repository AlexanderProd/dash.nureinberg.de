import { useRef } from 'react';

import { apiEndpoint } from '../utils';
import { useFetch } from './index';

export const useAPICall = <T>(
  url: string,
  method = 'GET',
  body?: any,
  immediate = true
) => {
  const options: RequestInit = {
    method,
    body: JSON.stringify(body),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const ref = useRef(options);

  if (
    ref.current.method !== options.method ||
    ref.current.body !== options.body
  ) {
    ref.current = options;
  }

  return useFetch<T>(apiEndpoint + url, ref.current, false, immediate);
};
