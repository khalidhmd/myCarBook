import * as React from 'react';
import {Image, Text, View} from 'react-native';
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              margin: 0,
              padding: 0,
              backgroundColor: 'rebeccapurple',
            }}>
            <Text
              style={{
                backgroundColor: 'rebeccapurple',
                color: 'whitesmoke',
                fontSize: 36,
                fontWeight: 'bold',
                textAlign: 'center',
                width: '100%',
                padding: 10,
                margin: 0,
                letterSpacing: 1,
              }}>
              EgyCarBook
            </Text>
          </View>
        )}
        labelStyle={{width: '100%', padding: 0, margin: 0}}
        style={{width: '100%', padding: 0, margin: 0}}
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
