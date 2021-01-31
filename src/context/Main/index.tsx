import React, {
  createContext,
  useCallback,
  useReducer,
  ReactChild,
  useEffect,
  useContext,
} from 'react';

import AuthContext from '../Auth';
import { apiEndpoint } from '../../utils';
import { mainReducer } from './reducer';
import {
  EintragungenResponse,
  RohlingeResponse,
  ProdukteResponse,
} from '../../types';

interface State {
  eintragungen: {
    status: string;
    data?: EintragungenResponse;
    error?: any;
    fetchEintragungen: () => Promise<void>;
  };
  produkte: {
    status: string;
    data?: ProdukteResponse;
    error?: any;
    fetchProdukte: () => Promise<void>;
  };
  rohlinge: {
    status: string;
    data?: RohlingeResponse;
    error?: any;
    fetchRohlinge: () => Promise<void>;
  };
}

const defaultContext = {
  eintragungen: {
    status: 'idle',
    data: undefined,
    error: undefined,
    fetchEintragungen: () => new Promise<void>(resolve => resolve()),
  },
  produkte: {
    status: 'idle',
    data: undefined,
    error: undefined,
    fetchProdukte: () => new Promise<void>(resolve => resolve()),
  },
  rohlinge: {
    status: 'idle',
    data: undefined,
    error: undefined,
    fetchRohlinge: () => new Promise<void>(resolve => resolve()),
  },
};

const MainContext = createContext<State>(defaultContext);

export function MainProvider({ children }: { children: ReactChild }) {
  const { user, setUser } = useContext(AuthContext);
  const [state, dispatch] = useReducer(mainReducer, defaultContext);

  const fetchEintragungen = useCallback(async () => {
    try {
      dispatch({ type: 'EINTRAGUNGEN_REQUEST' });
      const res = await fetch(`${apiEndpoint}/bestand/eintragungen`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();

      if (res.status !== 200) {
        if (res.status === 401) setUser(null);
        dispatch({ type: 'EINTRAGUNGEN_FAILURE', payload: json.error });
      } else {
        dispatch({ type: 'EINTRAGUNGEN_SUCCESS', payload: json });
      }
    } catch (error) {
      dispatch({ type: 'EINTRAGUNGEN_FAILURE', payload: error.message });
    }
  }, [setUser]);

  const fetchProdukte = useCallback(async () => {
    try {
      dispatch({ type: 'PRODUKTE_REQUEST' });
      const res = await fetch(`${apiEndpoint}/bestand/produkte`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();

      if (res.status !== 200) {
        if (res.status === 401) setUser(null);
        dispatch({ type: 'PRODUKTE_FAILURE', payload: json.error });
      } else {
        dispatch({ type: 'PRODUKTE_SUCCESS', payload: json });
      }
    } catch (error) {
      dispatch({ type: 'PRODUKTE_FAILURE', payload: error.message });
    }
  }, [setUser]);

  const fetchRohlinge = useCallback(async () => {
    try {
      dispatch({ type: 'ROHLINGE_REQUEST' });
      const res = await fetch(`${apiEndpoint}/bestand/rohlinge`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();

      if (res.status !== 200) {
        if (res.status === 401) setUser(null);
        dispatch({ type: 'ROHLINGE_FAILURE', payload: json.error });
      } else {
        dispatch({ type: 'ROHLINGE_SUCCESS', payload: json });
      }
    } catch (error) {
      dispatch({ type: 'ROHLINGE_FAILURE', payload: error.message });
    }
  }, [setUser]);

  useEffect(() => {
    if (user) {
      fetchEintragungen();
      fetchProdukte();
      fetchRohlinge();
    }
  }, [user, fetchEintragungen, fetchProdukte, fetchRohlinge]);

  const stateWithFunctions: State = {
    eintragungen: {
      ...state.eintragungen,
      fetchEintragungen,
    },
    produkte: {
      ...state.produkte,
      fetchProdukte,
    },
    rohlinge: {
      ...state.rohlinge,
      fetchRohlinge,
    },
  };

  return (
    <MainContext.Provider value={stateWithFunctions}>
      {children}
    </MainContext.Provider>
  );
}

export default MainContext;
