import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TypeForm from '../pages/TypeForm';
import TypeView from '../pages/TypeView';
import TypeList from '../pages/TypeList';

const Stack = createStackNavigator();

export default function MaintenanceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TypeList" component={TypeList} />
      <Stack.Screen name="TypeView" component={TypeView} />
      <Stack.Screen name="TypeForm" component={TypeForm} />
    </Stack.Navigator>
  );
}
