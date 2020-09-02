import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CarForm from '../pages/CarForm';
import CarView from '../pages/CarView';
import CarList from '../pages/CarList';
import KmForm from '../pages/KmForm';

const Stack = createStackNavigator();

export default function CarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CarList" component={CarList} />
      <Stack.Screen name="CarView" component={CarView} />
      <Stack.Screen name="CarForm" component={CarForm} />
      <Stack.Screen name="KmForm" component={KmForm} />
    </Stack.Navigator>
  );
}
