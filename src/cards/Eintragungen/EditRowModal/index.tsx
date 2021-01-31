import React, {
  ChangeEvent,
  SyntheticEvent,
  useReducer,
  useContext,
} from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
  useDisclosure,
  Flex,
  Text,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Checkbox,
  Select,
  useToast,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

import MainContext from '../../../context/Main';
import StatusBadge from '../../../components/ui/StatusBadge';
import { EintragungStatus } from '../../../types/Eintragung';
import { useAPICall } from '../../../hooks';
import DeleteAlert from './DeleteAlert';

interface State {
  bestellnummer?: string;
  textilkennzeichen?: string;
  produktnummer?: string;
  anzahl?: number;
  produziert?: boolean;
  status?: EintragungStatus;
  name?: string;
  kommentar?: string;
}

type ActionType =
  | { type: 'SET_BESTELLNUMMER'; payload: string }
  | { type: 'SET_TEXTILKENNZEICHEN'; payload: string }
  | { type: 'SET_PRODUKTNUMMER'; payload: string }
  | { type: 'SET_ANZAHL'; payload: number }
  | { type: 'SET_PRODUZIERT' }
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
    case 'SET_PRODUZIERT':
      return { ...state, produziert: !state.produziert };
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

const EditRowModal = ({ row }: { row: any }) => {
  const context = useContext(MainContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const initialState: State = {
    bestellnummer: row?.values['Bestellnummer'],
    textilkennzeichen: row?.values['Textilkennzeichen'],
    produktnummer: row?.values['Produktnummer'],
    anzahl: row?.values['Anzahl'],
    produziert: row?.values['Produziert'],
    status: row?.values['Status'],
    name: row?.values['Name'],
    kommentar: row?.values['Kommentar'],
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, error, fetchData } = useAPICall(
    `/bestand/eintragung/${row?.values['Id']}`,
    'PUT',
    state,
    false
  );

  if (error) {
    console.error(error);
    toast({
      title: 'Ein Fehler ist aufgetreten.',
      description: error,
      status: 'error',
      duration: 20000,
      isClosable: true,
    });
  }

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      case 'Produziert':
        dispatch({ type: 'SET_PRODUZIERT' });
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

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetchData();
    context.eintragungen.fetchEintragungen();
    context.produkte.fetchProdukte();
    context.rohlinge.fetchRohlinge();
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        <EditIcon />
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="inside"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eintrag bearbeiten</ModalHeader>
          <ModalCloseButton />
          <ModalBody boxShadow="inner">
            <Table variant="unstyled">
              <Thead>
                <Tr>
                  <Th>
                    <Heading size="sm">Alter Wert</Heading>
                  </Th>
                  <Th>
                    <Heading size="sm">Neuer Wert</Heading>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Heading size="xs">Bestellnummer</Heading>
                    <Text>{row?.values['Bestellnummer']}</Text>
                  </Td>
                  <Td>
                    <Input
                      size="sm"
                      variant="flushed"
                      name="Bestellnummer"
                      placeholder="Bestellnummer"
                      onChange={handleInput}
                      value={state.bestellnummer || ''}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Heading size="xs">Textilkennzeichen</Heading>
                    <Text>{row?.values['Textilkennzeichen']}</Text>
                  </Td>
                  <Td>
                    <Input
                      size="sm"
                      variant="flushed"
                      name="Textilkennzeichen"
                      placeholder="Textilkennzeichen"
                      onChange={handleInput}
                      value={state.textilkennzeichen!! || ''}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Heading size="xs">Produktnummer</Heading>
                    <Text>{row?.values['Produktnummer']}</Text>
                  </Td>
                  <Td>
                    <Input
                      size="sm"
                      variant="flushed"
                      name="Produktnummer"
                      placeholder="Produktnummer"
                      onChange={handleInput}
                      value={state.produktnummer || ''}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Heading size="xs">Anzahl</Heading>
                    <Text>{row?.values['Anzahl']}</Text>
                  </Td>
                  <Td>
                    <NumberInput
                      size="sm"
                      defaultValue={state.anzahl || 0}
                      onChange={handleNumber}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Heading size="xs">Produziert</Heading>
                    <Text>{row?.values['Produziert']}</Text>
                  </Td>
                  <Td>
                    <Checkbox
                      defaultIsChecked={row?.values['Produziert'] === true}
                      onChange={handleInput}
                      name="Produziert"
                    >
                      Produziert
                    </Checkbox>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Heading size="xs">Status</Heading>
                    <StatusBadge value={row?.values['Status']} />
                  </Td>
                  <Td>
                    <Select
                      size="sm"
                      placeholder="Status"
                      name="Status"
                      defaultValue={state.status}
                      onChange={handleInput}
                    >
                      <option value="Verkauf">Verkauf</option>
                      <option value="Einkauf">Einkauf</option>
                      <option value="Produktion">Produktion</option>
                      <option value="Schenkung">Schenkung</option>
                      <option value="Reklamation">Reklamation</option>
                      <option value="Storniert">Storniert</option>
                    </Select>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Heading size="xs">Name</Heading>
                    <Text>{row?.values['Name']}</Text>
                  </Td>
                  <Td>
                    <Input
                      size="sm"
                      variant="flushed"
                      placeholder="Name"
                      name="Name"
                      onChange={handleInput}
                      value={state.name || ''}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Heading size="xs">Kommentar</Heading>
                    <Text>{row?.values['Kommentar']}</Text>
                  </Td>
                  <Td>
                    <Input
                      size="sm"
                      variant="flushed"
                      name="Kommentar"
                      value={state.kommentar || ''}
                      placeholder="Kommentar"
                      onChange={handleInput}
                    />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>

          <ModalFooter>
            <Flex justifyContent="space-between" w="100%">
              <Button colorScheme="blue" onClick={onClose}>
                Abbrechen
              </Button>

              <DeleteAlert id={row?.values['Id']} />

              <Button
                variant="ghost"
                isLoading={status === 'pending'}
                loadingText="Senden..."
                onClick={handleSubmit}
              >
                Absenden
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditRowModal;
