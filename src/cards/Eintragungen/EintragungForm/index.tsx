import React, {
  ChangeEvent,
  FormEvent,
  useReducer,
  useContext,
  useEffect,
} from 'react';
import {
  Stack,
  Input,
  Select,
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
} from '@chakra-ui/react';

import MainContext from '../../../context/Main';
import { useAPICall } from '../../../hooks';
import { EintragungStatus } from '../../../types';

interface State {
  bestellnummer?: string;
  textilkennzeichen?: string;
  produktnummer?: string;
  anzahl?: number;
  status?: EintragungStatus;
  name?: string;
  kommentar?: string;
}

const initialState: State = {
  bestellnummer: '',
  textilkennzeichen: '',
  produktnummer: '',
  anzahl: 1,
  status: undefined,
  name: '',
  kommentar: '',
};

type ActionType =
  | { type: 'SET_BESTELLNUMMER'; payload: string }
  | { type: 'SET_TEXTILKENNZEICHEN'; payload: string }
  | { type: 'SET_PRODUKTNUMMER'; payload: string }
  | { type: 'SET_ANZAHL'; payload: number }
  | { type: 'SET_STATUS'; payload: EintragungStatus }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_KOMMENTAR'; payload: string };

const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case 'SET_BESTELLNUMMER':
      return { ...state, bestellnummer: action.payload };
    case 'SET_TEXTILKENNZEICHEN':
      return { ...state, textilkennzeichen: action.payload };
    case 'SET_PRODUKTNUMMER':
      return { ...state, produktnummer: action.payload };
    case 'SET_ANZAHL':
      return { ...state, anzahl: action.payload };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_KOMMENTAR':
      return { ...state, kommentar: action.payload };
    default:
      return state;
  }
};

const EintragungForm = () => {
  const context = useContext(MainContext);
  const fetchEintragungen = context.eintragungen.fetchEintragungen;
  const fetchProdukte = context.produkte.fetchProdukte;
  const fetchRohlinge = context.rohlinge.fetchRohlinge;
  const toast = useToast();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, error, fetchData } = useAPICall(
    `/bestand/eintragung`,
    'POST',
    state,
    false
  );

  useEffect(() => {
    if (status === 'error') {
      console.error(error);
      toast({
        title: 'Ein Fehler ist aufgetreten.',
        description: error.name,
        status: 'error',
        duration: 20000,
        isClosable: true,
      });
    }
  }, [error, status, toast]);

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;

    switch (name) {
      case 'Bestellnummer':
        dispatch({ type: 'SET_BESTELLNUMMER', payload: value });
        break;
      case 'Textilkennzeichen':
        dispatch({ type: 'SET_TEXTILKENNZEICHEN', payload: value });
        break;
      case 'Produktnummer':
        dispatch({ type: 'SET_PRODUKTNUMMER', payload: value });
        break;
      case 'Status':
        dispatch({ type: 'SET_STATUS', payload: value as EintragungStatus });
        break;
      case 'Name':
        dispatch({ type: 'SET_NAME', payload: value });
        break;
      case 'Kommentar':
        dispatch({ type: 'SET_KOMMENTAR', payload: value });
        break;
      default:
        break;
    }
  };

  const handleNumber = (_: string, value: number) => {
    dispatch({ type: 'SET_ANZAHL', payload: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetchData();
  };

  useEffect(() => {
    if (status === 'success') {
      fetchEintragungen();
      fetchProdukte();
      fetchRohlinge();
    }
  }, [status, fetchEintragungen, fetchProdukte, fetchRohlinge]);

  return (
    <Stack
      direction={['column', 'column', 'row']}
      spacing={4}
      marginBottom={8}
      as="form"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Bestellnummer"
        name="Bestellnummer"
        onChange={handleInput}
        value={state.bestellnummer}
      />
      <Input
        placeholder="Textilkennzeichen"
        name="Textilkennzeichen"
        onChange={handleInput}
        value={state.textilkennzeichen}
        isRequired
      />
      <Input
        placeholder="Produktnummer"
        name="Produktnummer"
        onChange={handleInput}
        value={state.produktnummer}
      />
      <NumberInput
        defaultValue={1}
        min={1}
        name="Anzahl"
        onChange={handleNumber}
      >
        <NumberInputField placeholder="Anzahl" minWidth={16} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Select
        placeholder="Status"
        name="Status"
        onChange={handleInput}
        value={state.status}
        isRequired
      >
        <option value="Verkauf">Verkauf</option>
        <option value="Einkauf">Einkauf</option>
        <option value="Produktion">Produktion</option>
        <option value="Schenkung">Schenkung</option>
        <option value="Reklamation">Reklamation</option>
        <option value="Storniert">Storniert</option>
      </Select>
      <Input
        placeholder="Name"
        name="Name"
        value={state.name}
        onChange={handleInput}
      />
      <Input
        placeholder="Kommentar"
        name="Kommentar"
        value={state.kommentar}
        onChange={handleInput}
      />
      <Button
        colorScheme="green"
        size="md"
        minWidth="unset"
        type="submit"
        isLoading={status === 'pending'}
        loadingText="Senden..."
      >
        Erstellen
      </Button>
    </Stack>
  );
};

export default EintragungForm;
