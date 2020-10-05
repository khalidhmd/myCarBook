import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CarForm from '../pages/CarForm';
import CarView from '../pages/CarView';
import CarList from '../pages/CarList';
import KmForm from '../pages/KmForm';
import FuelForm from '../pages/FuelForm';
import KmRecords from '../pages/KmRecords';
import FuelRecords from '../pages/FuelRecords';
import MaintenanceForm from '../pages/MaintenanceForm';
import MaintenanceRecords from '../pages/MaintenanceRecords';
import MaintenanceView from '../pages/MaintenanceView';

const Stack = createStackNavigator();

export default function CarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CarList" component={CarList} />
      <Stack.Screen name="CarView" component={CarView} />
      <Stack.Screen name="CarForm" component={CarForm} />
      <Stack.Screen name="KmForm" component={KmForm} />
      <Stack.Screen name="FuelForm" component={FuelForm} />
      <Stack.Screen name="KmRecords" component={KmRecords} />
      <Stack.Screen name="FuelRecords" component={FuelRecords} />
      <Stack.Screen name="MaintenanceForm" component={MaintenanceForm} />
      <Stack.Screen name="MaintenanceView" component={MaintenanceView} />
      <Stack.Screen name="MaintenanceRecords" component={MaintenanceRecords} />
    </Stack.Navigator>
  );
}
