import React from 'react';
import CarList from './src/components/CarList';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CarStack from './src/routes/CarStack';
const App = () => {
  return (
    <NavigationContainer>
      <CarStack />
      <StatusBar barStyle="dark-content" />
    </NavigationContainer>
  );
};

export default App;
