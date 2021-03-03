import { useCallback, useEffect, useReducer, useRef } from 'react';

// Reducer State
interface State<T> {
  status: 'idle' | 'pending' | 'error' | 'success';
  data?: T;
  error?: any;
}

interface Cache<T> {
  [url: string]: T;
}

// discriminated union type
type ActionType<T> =
  | { type: 'REQUEST' }
  | { type: 'SUCCESS'; payload: T }
  | { type: 'FAILURE'; payload: any };

// Hook output
interface ReturnType<T> extends State<T> {
  fetchData: (
    cancelRequest?: boolean,
    body?: any,
    overwriteURL?: string
  ) => Promise<void>;
}

interface ArgumentsObject {
  url: string;
  options?: RequestInit;
  cached?: boolean;
  immediate?: boolean;
}

export function useFetch<T = unknown>(
  argumentsObject: ArgumentsObject
): ReturnType<T> {
  const { url, options, cached, immediate } = argumentsObject;
  const cache = useRef<Cache<T>>({});

  const initialState: State<T> = {
    status: 'idle',
    error: undefined,
    data: undefined,
  };

  const fetchReducer = (state: State<T>, action: ActionType<T>): State<T> => {
    switch (action.type) {
      case 'REQUEST':
        return { ...state, status: 'pending' };
      case 'SUCCESS':
        return { ...state, status: 'success', data: action.payload };
      case 'FAILURE':
        return { ...state, status: 'error', error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchData = useCallback(
    async (
      cancelRequest: boolean = false,
      body?: any,
      overwriteURL?: string
    ) => {
      dispatch({ type: 'REQUEST' });

      if (cache.current[overwriteURL || url] && cached) {
        dispatch({
          type: 'SUCCESS',
          payload: cache.current[overwriteURL || url],
        });
      } else {
        try {
          const requestInit: RequestInit = {
            ...options,
          };
          if (body) requestInit.body = JSON.stringify(body);

          const res = await fetch(overwriteURL || url, requestInit);
          const json = await res.json();
          cache.current[overwriteURL || url] = json;

          if (cancelRequest) return;

          if (res.status !== 200) {
            dispatch({ type: 'FAILURE', payload: json.error });
          } else {
            dispatch({ type: 'SUCCESS', payload: json });
          }
        } catch (error) {
          if (cancelRequest) return;

          dispatch({ type: 'FAILURE', payload: error.message });
        }
      }
    },
    [cached, options, url]
  );

  useEffect(() => {
    let cancelRequest = false;

    if (immediate) fetchData(cancelRequest);

    return () => {
      cancelRequest = true;
    };
  }, [url, options, cached, immediate, fetchData]);

  return { fetchData, ...state };
}

export default useFetch;
