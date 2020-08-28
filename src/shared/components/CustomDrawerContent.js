import * as React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {DrawerItemList} from '@react-navigation/drawer';

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
            textAlign: 'center',
            width: '100%',
            padding: 10,
            paddingVertical: 20,
            letterSpacing: 1,
            fontFamily: 'Almarai-Regular',
          }}>
          EgyCarBook
        </Text>
      </View>
      <View />

      <DrawerItemList {...props} />
    </ScrollView>
  );
}
