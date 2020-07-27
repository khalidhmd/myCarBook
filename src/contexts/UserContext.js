import React, {useState, createContext, useEffect} from 'react';
import {getUser, saveUser} from '../data/storage';

export const UserContext = createContext();

const UserContextProvider = props => {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async function() {
      const u = await getUser();
      setUser(u);
    })();
  }, []);

  useEffect(() => {
    saveUser(user);
  }, [user]);

  const handleSaveUser = user => {
    setUser(user);
  };

  const deleteUser = () => {
    setUser({});
  };

  return (
    <UserContext.Provider value={{handleSaveUser, user, deleteUser}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
