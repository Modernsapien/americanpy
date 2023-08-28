import React, { createContext, useContext, useState } from 'react';

const CredentialsContext = createContext();

export function CredentialsProvider({ children }) {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [token, setToken] = useState();
  return (
    <CredentialsContext.Provider
      value={{
        usernameValue,
        setUsernameValue,
        passwordValue,
        setPasswordValue,
        token,
        setToken,
      }}
    >
      {children}
    </CredentialsContext.Provider>
  );
}

export function useCredentials() {
  return useContext(CredentialsContext);
}
