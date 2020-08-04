import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CarStack from './CarStack';
import UserForm from './UserStack';

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: 'rebeccapurple',
        labelStyle: {fontSize: 22, fontWeight: 'bold'},
      }}>
      <Drawer.Screen
        name="CarStack"
        component={CarStack}
        options={{drawerLabel: 'السيارات المسجلة'}}
      />
      <Drawer.Screen
        name="UserForm"
        component={UserForm}
        options={{drawerLabel: 'بيانات المستخدم'}}
      />
    </Drawer.Navigator>
  );
}
