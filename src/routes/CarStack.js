import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CarForm from '../components/CarForm';
import CarView from '../components/CarView';
import CarList from '../components/CarList';

const Stack = createStackNavigator();

export default function CarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CarList" component={CarList} />
      <Stack.Screen name="CarView" component={CarView} />
      <Stack.Screen name="CarForm" component={CarForm} />
    </Stack.Navigator>
  );
}
