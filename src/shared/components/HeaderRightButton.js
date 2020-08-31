import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function(props) {
  return (
    <TouchableOpacity onPress={props.pressHnadler}>
      <Icon name={props.iconName} size={36} color="white" />
    </TouchableOpacity>
  );
}
