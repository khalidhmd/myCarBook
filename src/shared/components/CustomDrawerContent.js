import * as React from 'react';
import {Text, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginHorizontal: 5,
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
            paddingVertical: 20,
            letterSpacing: 1,
          }}>
          EgyCarBook
        </Text>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
