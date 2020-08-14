import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../shared/components/CustomDrawerContent';
import Icon from 'react-native-vector-icons/Ionicons';
import CarStack from './CarStack';
import UserForm from './UserStack';

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: 'rebeccapurple',
        labelStyle: {fontSize: 22, fontWeight: 'bold'},
        style: {
          padding: 0,
          margin: 0,
        },
        itemStyle: {
          padding: 0,
          margin: 0,
          width: '100%',
        },
      }}>
      <Drawer.Screen
        name="CarStack"
        component={CarStack}
        options={{
          drawerLabel: 'السيارات المسجلة',
          drawerIcon: ({focused}) => (
            <Icon
              name="car-outline"
              size={42}
              color={focused ? 'rebeccapurple' : 'gray'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="UserForm"
        component={UserForm}
        options={{
          drawerLabel: 'بيانات المستخدم',
          drawerIcon: ({focused}) => (
            <Icon
              name="person-circle-outline"
              size={42}
              color={focused ? 'rebeccapurple' : 'gray'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
