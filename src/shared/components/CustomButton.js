import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

export default function(props) {
  return (
    <TouchableOpacity onPress={props.pressHandler}>
      <View style={styles.buttonView}>
        <Icon name={props.iconName} size={22} color="rebeccapurple" />
        <Text style={styles.save}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}
