import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CarStack from './CarStack';
import UserForm from './UserStack';

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="CarStack" component={CarStack} />
      <Drawer.Screen name="UserForm" component={UserForm} />
    </Drawer.Navigator>
  );
}
