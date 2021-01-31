import { useState } from 'react';

import { apiEndpoint } from '../utils';

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const checkToken = (): Promise<string | null> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${apiEndpoint}/check-token`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        const json = await res.json();

        if (res.status === 200) {
          setUser(json.email);
          resolve(user);
        } else {
          setUser(null);
          reject(json.error);
        }
      } catch (error) {
        setUser(null);
        reject(error);
      }
    });
  };

  const login = (email: string, password: string): Promise<string | null> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${apiEndpoint}/login`, {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        const json = await res.json();

        if (res.status === 200) {
          setUser(json.email);
          resolve(user);
        } else {
          setUser(null);
          reject(json.error);
        }
      } catch (error) {
        setUser(null);
        reject(error);
      }
    });
  };

  /* const signout = (cb) => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  }; */

  return {
    user,
    setUser,
    login,
    checkToken,
    /* signout, */
  };
}
