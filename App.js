import React from 'react';
import UserForm from './src/components/UserForm';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App = () => {
  return (
    <>
      <UserForm />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default App;
