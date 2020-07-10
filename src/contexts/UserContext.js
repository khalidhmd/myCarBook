import React, {useState, createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const UserContext = createContext();

const UserContextProvider = props => {
  const [user, setUser] = useState({});

  useEffect(() => {
    AsyncStorage.getItem('MY_CAR_BOOK:user').then(data => {
      if (!data || data == 'null') {
        setUser(JSON.parse({}));
      } else {
        setUser(JSON.parse(data));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('MY_CAR_BOOK:user', JSON.stringify(user));
  }, [user]);

  const saveUser = user => {
    setUser(user);
  };

  const deleteUser = () => {
    setUser({});
  };

  return (
    <UserContext.Provider value={{saveUser, user, deleteUser}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
