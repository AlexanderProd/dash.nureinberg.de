import React, { createContext, ReactChild } from 'react';

import { useProvideAuth } from '../../hooks';

type ContextProps = {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
  login(email: string, password: string): Promise<string | null>;
  checkToken(): Promise<any>;
};

const AuthContext = createContext<ContextProps>({
  user: null,
  setUser: () => {},
  login: () => new Promise(resolve => resolve(null)),
  checkToken: () => new Promise(resolve => resolve(null)),
});

export function AuthProvider({ children }: { children: ReactChild }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthContext;
