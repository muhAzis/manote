import { createContext, useEffect, useState } from 'react';

export const WindowSizeContext = createContext();

const WindowSizeContextProvider = ({ children }) => {
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const windowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', windowResize);

    return () => {
      window.removeEventListener('resize', windowResize);
    };
  }, []);

  return <WindowSizeContext.Provider value={windowSize}>{children}</WindowSizeContext.Provider>;
};

export default WindowSizeContextProvider;
