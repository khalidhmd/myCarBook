import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CarStack from './src/routes/CarStack';
import CarContextProvider from './src/contexts/CarContext';
import UserContextProvider from './src/contexts/UserContext';
import SystemContextProvider from './src/contexts/SystemContext';
const App = () => {
  return (
    <CarContextProvider>
      <UserContextProvider>
        <SystemContextProvider>
          <NavigationContainer>
            <CarStack />
            <StatusBar barStyle="dark-content" />
          </NavigationContainer>
        </SystemContextProvider>
      </UserContextProvider>
    </CarContextProvider>
  );
};

export default App;
