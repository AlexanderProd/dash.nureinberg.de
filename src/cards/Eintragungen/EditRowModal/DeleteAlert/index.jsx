import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  Flex,
  Button,
  AlertDialog,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';

import MainContext from '../../../../context/Main';
import { useAPICall } from '../../../../hooks';

const DeleteAlert = ({ id }) => {
  const context = useContext(MainContext);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const { status, error, fetchData } = useAPICall(
    `/bestand/eintragung/${id}`,
    'DELETE',
    {},
    false
  );

  if (error) console.error(error);

  const handleSubmit = e => {
    e.preventDefault();

    fetchData();
  };

  useEffect(() => {
    if (status === 'success') {
      context.eintragungen.fetchEintragungen();
      context.produkte.fetchProdukte();
      context.rohlinge.fetchRohlinge();
    }
  }, [status, context]);

  return (
    <>
      <Button
        colorScheme="red"
        variant="outline"
        onClick={() => setIsOpen(true)}
      >
        Löschen
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eintrag löschen
            </AlertDialogHeader>

            <AlertDialogBody>
              Sind Sie sicher dass Sie den Eintrag löschen wollen? Dies kann
              nicht rückgängig gemacht werden.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Flex justifyContent="space-between">
                <Button ref={cancelRef} onClick={onClose}>
                  Abbrechen
                </Button>
                <Button
                  colorScheme="red"
                  onClick={handleSubmit}
                  ml={3}
                  isLoading={status === 'pending'}
                >
                  Löschen
                </Button>
              </Flex>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteAlert;
