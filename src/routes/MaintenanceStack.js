import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CarForm from '../pages/CarForm';
import CarView from '../pages/CarView';
import TypeList from '../pages/TypeList';

const Stack = createStackNavigator();

export default function MaintenanceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TypeList" component={TypeList} />
    </Stack.Navigator>
  );
}
