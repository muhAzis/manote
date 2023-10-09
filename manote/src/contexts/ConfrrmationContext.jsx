import { createContext, useState } from 'react';

export const ConfirmationContext = createContext(null);

const ConfirmationContextProvider = ({ children }) => {
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const [note, setNote] = useState('');

  return <ConfirmationContext.Provider value={{ displayConfirm, setDisplayConfirm, note, setNote }}>{children}</ConfirmationContext.Provider>;
};

export default ConfirmationContextProvider;
