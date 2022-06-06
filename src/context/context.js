import React, { createContext, useContext } from 'react'

const AppContext = createContext();

function AppProvider({ children }) {

    const ContextValue = {

    }

  return (
    <AppContext.Provider value={ContextValue}>
        {children}
    </AppContext.Provider>
  )
}

const useGlobal = () => {
    return useContext(AppContext);
};

export {AppContext, AppProvider, useGlobal};