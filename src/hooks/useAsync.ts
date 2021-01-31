import { useReducer, useRef, useEffect, useCallback } from 'react';

const initialState = {
  status: 'idle',
  value: null,
  error: null,
};

type Actiontype =
  | {
      type: 'PENDING';
      status?: 'peding';
      value?: any;
      error?: any;
    }
  | {
      type: 'SUCCESS';
      status?: 'success';
      value: any;
      error?: any;
    }
  | { type: 'ERROR'; status?: 'error'; value?: any; error: any };

function reducer(state: typeof initialState, action: Actiontype) {
  switch (action.type) {
    case 'PENDING':
      return { ...state, status: 'pending' };
    case 'SUCCESS':
      return { ...state, status: 'success', value: action.value };
    case 'ERROR':
      return { ...state, status: 'error', error: action.error };
    default:
      throw new Error();
  }
}

export const useAsync = (
  asyncFunction: (...args: any) => Promise<any>,
  immediate = false
) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isAlive = useRef(true);

  useEffect(() => {
    return () => {
      isAlive.current = false;
    };
  }, []);

  const execute = useCallback(
    async (...args) => {
      dispatch({ type: 'PENDING' });

      return asyncFunction(...args)
        .then(response => {
          if (isAlive.current) {
            dispatch({ type: 'SUCCESS', value: response });
          }
          return 'success';
        })
        .catch(error => {
          if (isAlive.current) {
            dispatch({ type: 'ERROR', error });
          }
          return 'error';
        });
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, ...state };
};
