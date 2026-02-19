import React, { createContext, useContext, useState } from 'react';

const BTSContext = createContext();

export function BTSProvider({ children }) {
  const [showBTS, setShowBTS] = useState(false);

  return (
    <BTSContext.Provider value={{ showBTS, setShowBTS, toggleBTS: () => setShowBTS(p => !p) }}>
      {children}
    </BTSContext.Provider>
  );
}

export function useBTS() {
  const ctx = useContext(BTSContext);
  if (!ctx) throw new Error('useBTS must be used within BTSProvider');
  return ctx;
}
