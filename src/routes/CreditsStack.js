import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreditsScreen from '../pages/Credits';

const Stack = createStackNavigator();

export default function CreditsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreditsScreen" component={CreditsScreen} />
    </Stack.Navigator>
  );
}
