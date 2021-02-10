import { useRef } from 'react';

import { apiEndpoint } from '../utils';
import { useFetch } from './index';

interface ArgumentsObject {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: object;
  immediate?: boolean;
}

export const useAPICall = <T>(argumentsObject: ArgumentsObject) => {
  const { method, url, body, immediate } = argumentsObject;
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

  return useFetch<T>({
    url: apiEndpoint + url,
    options: ref.current,
    cached: false,
    immediate,
  });
};
