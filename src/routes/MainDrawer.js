import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../shared/components/CustomDrawerContent';
import Icon from 'react-native-vector-icons/Ionicons';
import CarStack from './CarStack';
import UserForm from './UserStack';
import CreditsScreen from './CreditsStack';
import MaintenanceStack from './MaintenanceStack';

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: 'indigo',
        inactiveTintColor: 'black',
        labelStyle: {
          fontSize: 16,
          fontFamily: 'Almarai-Regular',
          position: 'relative',
          left: -15,
        },
        itemStyle: {
          marginVertical: 0,
          width: '100%',
          position: 'relative',
          left: -10,
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
              size={30}
              color={focused ? 'indigo' : '#606060'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="MaintenanceStack"
        component={MaintenanceStack}
        options={{
          drawerLabel: 'أنواع الصيانات',
          drawerIcon: ({focused}) => (
            <Icon
              name="construct-outline"
              size={30}
              color={focused ? 'indigo' : '#606060'}
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
              size={30}
              color={focused ? 'indigo' : '#606060'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="CreditsScreen"
        component={CreditsScreen}
        options={{
          drawerLabel: 'Credits',
          drawerIcon: ({focused}) => (
            <Icon
              name="information-circle-outline"
              size={30}
              color={focused ? 'indigo' : '#606060'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
