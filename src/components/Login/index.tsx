import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Text, Input, Button, Stack } from '@chakra-ui/react';

import WarningBox from '../ui/WarningBox';
import { useAuth, useAsync, useRouter } from '../../hooks';

const Login = () => {
  const { login } = useAuth();
  const { history, location } = useRouter();
  const { execute, status, error } = useAsync(login);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // @ts-ignore
  const { from } = location.state || { from: { pathname: '/' } };

  const handleEmailField = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordField = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await execute(email, password);
    if (res === 'success') history.replace(from);
  };

  return (
    <>
      <Stack direction="column" as="form" w="100%" onSubmit={handleSubmit}>
        <Input
          width="100%"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailField}
          required
        />
        <Input
          width="100%"
          type="password"
          name="password"
          placeholder="Passwort"
          value={password}
          onChange={handlePasswordField}
          required
        />
        <br />
        <br />
        <Button
          width="100%"
          type="submit"
          value="anmelden"
          minWidth="unset"
          colorScheme="blue"
          disabled={status === 'pending'}
          isLoading={status === 'pending'}
          loadingText="Anmelden..."
        >
          Anmelden
        </Button>
      </Stack>
      <Text size="sm" m={4} color="grey">
        Passwort zurücksetzen.
      </Text>
      {error && <WarningBox errorMsg={error} />}
    </>
  );
};

export default Login;
