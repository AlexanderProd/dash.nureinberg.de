import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from './context/AuthContext';
import { MainProvider } from './context/Main';
import PrivateRoute from './components/PrivateRoute';
import DevEnvAlert from './components/NotificationBar';
import Bestand from './pages/Bestand';
import Login from './pages/Login';

const App = () => (
  <ChakraProvider>
    <AuthProvider>
      <MainProvider>
        <DevEnvAlert />
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/">
              <Bestand />
            </PrivateRoute>
          </Switch>
        </Router>
      </MainProvider>
    </AuthProvider>
  </ChakraProvider>
);

export default App;
