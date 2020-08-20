import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import MainDrawer from './src/routes/MainDrawer';
import CarContextProvider from './src/contexts/CarContext';
import UserContextProvider from './src/contexts/UserContext';
import SystemContextProvider from './src/contexts/SystemContext';
import ActiveCarContextProvider from './src/contexts/ActiveCarContext';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <ActiveCarContextProvider>
      <CarContextProvider>
        <UserContextProvider>
          <SystemContextProvider>
            <NavigationContainer>
              <MainDrawer />
              <StatusBar barStyle="dark-content" />
            </NavigationContainer>
          </SystemContextProvider>
        </UserContextProvider>
      </CarContextProvider>
    </ActiveCarContextProvider>
  );
};

export default App;
