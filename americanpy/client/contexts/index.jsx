import React, { createContext, useContext, useState } from 'react';

const CredentialsContext = createContext();

export function CredentialsProvider({ children }) {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <CredentialsContext.Provider
      value={{
        usernameValue,
        setUsernameValue,
        passwordValue,
        setPasswordValue,
      }}
    >
      {children}
    </CredentialsContext.Provider>
  );
}

export function useCredentials() {
  return useContext(CredentialsContext);
}
