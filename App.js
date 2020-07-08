import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CarStack from './src/routes/CarStack';
import CarContextProvider from './src/contexts/CarContext';
import UserContextProvider from './src/contexts/UserContext';
const App = () => {
  return (
    <CarContextProvider>
      <UserContextProvider>
        <NavigationContainer>
          <CarStack />
          <StatusBar barStyle="dark-content" />
        </NavigationContainer>
      </UserContextProvider>
    </CarContextProvider>
  );
};

export default App;
