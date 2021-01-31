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

type ActionType =
  | { type: 'EINTRAGUNGEN_REQUEST' | 'PRODUKTE_REQUEST' | 'ROHLINGE_REQUEST' }
  | { type: 'EINTRAGUNGEN_SUCCESS'; payload: EintragungenResponse }
  | { type: 'ROHLINGE_SUCCESS'; payload: RohlingeResponse }
  | { type: 'PRODUKTE_SUCCESS'; payload: ProdukteResponse }
  | {
      type: 'EINTRAGUNGEN_FAILURE' | 'PRODUKTE_FAILURE' | 'ROHLINGE_FAILURE';
      payload: any;
    };

export const mainReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case 'EINTRAGUNGEN_REQUEST':
      return {
        ...state,
        eintragungen: { ...state.eintragungen, status: 'pending' },
      };
    case 'EINTRAGUNGEN_SUCCESS':
      return {
        ...state,
        eintragungen: {
          ...state.eintragungen,
          status: 'success',
          data: action.payload,
        },
      };
    case 'EINTRAGUNGEN_FAILURE':
      return {
        ...state,
        eintragungen: {
          ...state.eintragungen,
          status: 'error',
          error: action.payload,
        },
      };
    case 'PRODUKTE_REQUEST':
      return {
        ...state,
        produkte: { ...state.produkte, status: 'pending' },
      };
    case 'PRODUKTE_SUCCESS':
      return {
        ...state,
        produkte: {
          ...state.produkte,
          status: 'success',
          data: action.payload,
        },
      };
    case 'PRODUKTE_FAILURE':
      return {
        ...state,
        produkte: {
          ...state.produkte,
          status: 'error',
          error: action.payload,
        },
      };
    case 'ROHLINGE_REQUEST':
      return {
        ...state,
        rohlinge: { ...state.rohlinge, status: 'pending' },
      };
    case 'ROHLINGE_SUCCESS':
      return {
        ...state,
        rohlinge: {
          ...state.rohlinge,
          status: 'success',
          data: action.payload,
        },
      };
    case 'ROHLINGE_FAILURE':
      return {
        ...state,
        rohlinge: {
          ...state.rohlinge,
          status: 'error',
          data: action.payload,
        },
      };
    default:
      return state;
  }
};
