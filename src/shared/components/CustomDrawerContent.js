import * as React from 'react';
import {Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={() => (
          <Image
            style={{width: 250, height: 140}}
            source={require('../../../assets/car2.jpeg')}
          />
        )}
        onPress={() => props.navigation.navigate('UserForm')}
      />
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => props.navigation.navigate('UserForm')}
      />
    </DrawerContentScrollView>
  );
}
