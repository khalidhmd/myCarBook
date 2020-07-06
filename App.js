import React from 'react';
import CarForm from './src/components/CarForm';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <CarForm car={{}} />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default App;
