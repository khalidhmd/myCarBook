import React, {useState, createContext, useEffect} from 'react';

export const ActiveCarContext = createContext();

const ActiveCarContextProvider = props => {
  const [activeCar, setActiveCar] = useState({});

  return (
    <ActiveCarContext.Provider value={{activeCar, setActiveCar}}>
      {props.children}
    </ActiveCarContext.Provider>
  );
};

export default ActiveCarContextProvider;
