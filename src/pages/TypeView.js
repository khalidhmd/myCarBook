import React, {useContext} from 'react';
import styles from '../shared/styles';
import {
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import {SystemContext} from '../contexts/SystemContext';
import {removeType} from '../data/storage';

export default function TypeView({navigation, route}) {
  const {language} = useContext(SystemContext);
  const fd = language == 'en' ? 'row-reverse' : 'row';
  const type = {...route.params.type};
  navigation.setOptions({
    title: type.name,
    headerTitleStyle: styles.headerTitleStyle,
    headerTintColor: 'lightgrey',
    headerStyle: {
      backgroundColor: 'rebeccapurple',
    },
    headerRight: () => (
      <Menu>
        <MenuTrigger>
          <Icon name="ellipsis-vertical" size={24} color="white" />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={handleUpdate}>
            <View
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 20, fontFamily: 'Almarai-Regular'}}>
                تعديل نوع صيانة
              </Text>
              <Icon name="create-outline" size={24} />
            </View>
          </MenuOption>

          <MenuOption onSelect={() => handleDelete(type.id)}>
            <View
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 20,
                  fontFamily: 'Almarai-Regular',
                }}>
                حذف نوع صيانة
              </Text>
              <Icon name="trash-outline" size={24} color="red" />
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    ),
  });

  const handleDelete = async idx => {
    Alert.alert(
      'حذف',
      'هل تريد حذف بيانات نوع الصيانة؟',
      [
        {
          text: 'لا',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'حذف',
          onPress: async () => {
            await removeType(idx);
            navigation.pop();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleUpdate = () => {
    navigation.navigate('TypeForm', {
      mode: 'update',
      title: 'تعديل نوع صيانة',
      type,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      enabled
      keyboardVerticalOffset={100}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}>
          <View style={styles.container}>
            <View style={[styles.subForm, {flexDirection: fd}]}>
              <Text style={styles.title}>النوع</Text>
              <Text style={styles.title}>{type.name}</Text>
            </View>
            <View style={[styles.subForm, {flexDirection: fd}]}>
              <Text style={styles.title}>معدل كم</Text>
              <Text style={styles.title}>{String(type.kmRate)}</Text>
            </View>
            <View style={[styles.subForm, {flexDirection: fd}]}>
              <Text style={styles.title}>معدل زمني</Text>
              <Text style={styles.title}>{String(type.timeRate)}</Text>
            </View>
            <View style={[styles.subForm, {flexDirection: fd}]}>
              <Text style={styles.title}>التنبيه الزمني</Text>
              <Text style={styles.title}>{String(type.alertTime)}</Text>
            </View>
            <View style={[styles.subForm, {flexDirection: fd}]}>
              <Text style={styles.title}>التنبيه عند كم</Text>
              <Text style={styles.title}>{String(type.alertKm)}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
