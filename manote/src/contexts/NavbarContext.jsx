import { createContext, useState } from 'react';

export const NavbarContext = createContext(null);

const NavbarContextProvider = ({ children }) => {
  const [closed, setClosed] = useState(true);

  const values = {
    closed,
    setClosed,
  };

  return <NavbarContext.Provider value={values}>{children}</NavbarContext.Provider>;
};

export default NavbarContextProvider;
