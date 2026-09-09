import { createContext, useContext } from "react";

const AccountContext = createContext(null);

export function AccountProvider({ status, children }) {
  return (
    <AccountContext.Provider value={{ status }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  return useContext(AccountContext);
}
