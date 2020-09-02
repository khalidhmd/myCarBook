import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function({navigation}) {
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Icon name="menu-outline" size={30} color="white" />
    </TouchableOpacity>
  );
}
