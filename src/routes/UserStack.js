import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserForm from '../components/UserForm';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserForm" component={UserForm} />
    </Stack.Navigator>
  );
}
