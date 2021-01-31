import React, { ReactChild } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useAuth, useAsync } from '../../hooks';

const PrivateRoute = ({
  children,
  ...rest
}: {
  children: ReactChild;
  rest: RouteProps;
}) => {
  const { checkToken } = useAuth();
  const { status, error } = useAsync(checkToken, true);

  return (
    <Route
      {...rest}
      render={({ location }) => (
        <>
          {status === 'success' && children}
          {status === 'error' && console.error(error)}
          {status === 'error' && (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )}
        </>
      )}
    />
  );
};

export default PrivateRoute;
