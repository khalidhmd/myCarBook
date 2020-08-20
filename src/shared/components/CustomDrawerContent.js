import * as React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CustomDrawerContent(props) {
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'rebeccapurple',
          width: '100%',
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
      <View />

      <DrawerItemList {...props} />
    </ScrollView>
  );
}
