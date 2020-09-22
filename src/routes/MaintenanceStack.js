import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CarForm from '../pages/CarForm';
import CarView from '../pages/CarView';
import CarList from '../pages/CarList';
import KmForm from '../pages/KmForm';
import FuelForm from '../pages/FuelForm';
import KmRecords from '../pages/KmRecords';
import FuelRecords from '../pages/FuelRecords';

const Stack = createStackNavigator();

export default function MaintenanceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CarList" component={CarList} />
      <Stack.Screen name="CarView" component={CarView} />
      <Stack.Screen name="CarForm" component={CarForm} />
      <Stack.Screen name="KmForm" component={KmForm} />
      <Stack.Screen name="FuelForm" component={FuelForm} />
      <Stack.Screen name="KmRecords" component={KmRecords} />
      <Stack.Screen name="FuelRecords" component={FuelRecords} />
    </Stack.Navigator>
  );
}
