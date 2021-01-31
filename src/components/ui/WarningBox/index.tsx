import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Text, Link, AlertIcon, AlertTitle } from '@chakra-ui/react';

const WarningBox = ({ errorMsg }: { errorMsg: string }) => {
  return (
    <Alert status="error" maxW={96}>
      <AlertIcon />
      {typeof errorMsg === 'string' && errorMsg.includes('Unauthorized') && (
        <AlertTitle>Ihre Sitzung ist abgelaufen.</AlertTitle>
      )}
      {typeof errorMsg === 'string' && errorMsg.includes('Unauthorized') ? (
        <Text>
          Bitte erneut{' '}
          <Link
            as={RouterLink}
            to="/login"
            style={{ textDecoration: 'underline' }}
          >
            anmelden
          </Link>
          !
        </Text>
      ) : (
        errorMsg
      )}
    </Alert>
  );
};

export default WarningBox;
