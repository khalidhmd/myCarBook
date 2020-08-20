import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserForm from '../pages/UserForm';
import UserView from '../pages/UserView';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserView" component={UserView} />
      <Stack.Screen name="UserForm" component={UserForm} />
    </Stack.Navigator>
  );
}
