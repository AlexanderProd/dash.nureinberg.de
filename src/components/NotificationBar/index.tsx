import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';

const NotificationBar = () => (
  <>
    {process.env.NODE_ENV !== 'production' && (
      <Alert status="warning">
        <AlertIcon />
        Sie befinden sich in der Entwicklungsumgebung.
      </Alert>
    )}
  </>
);

export default NotificationBar;
