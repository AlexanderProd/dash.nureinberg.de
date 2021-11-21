import React from 'react';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';

import Login from '../../components/Login';
import { ParcelsIcons } from '../../components/ui/icons';

const LoginPage = () => (
  <Box height="100vh" bgColor="#F2F2F2">
    <Container h="100%">
      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        h="100%"
      >
        <ParcelsIcons boxSize={16} mb={8} />
        <Box bgColor="white" boxShadow="md" borderRadius={8} p={8}>
          <Flex
            alignItems="center"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Flex flexDirection="column" alignItems="center">
              <Heading mb={8}>NurEinBerg Bestand</Heading>
            </Flex>
            <Login />
          </Flex>
        </Box>
      </Flex>
    </Container>
  </Box>
);

export default LoginPage;
