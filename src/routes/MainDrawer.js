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
        inactiveTintColor: 'black',
        labelStyle: {fontSize: 20, fontWeight: 'bold', padding: 0, margin: 0},
        style: {
          padding: 0,
          margin: 0,
        },
        itemStyle: {
          padding: 0,
          margin: 0,
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
              size={36}
              color={focused ? 'rebeccapurple' : 'gray'}
              style={{padding: 0, margin: 0}}
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
