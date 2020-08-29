import React, {useState, useEffect, useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../shared/styles';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {UserContext} from '../contexts/UserContext';
import {SystemContext} from '../contexts/SystemContext';

export default function UserView({navigation}) {
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon name="menu-outline" size={42} color="white" />
      </TouchableOpacity>
    ),
    title: 'بيانات المستخدم',
    headerTitleStyle: styles.headerTitleStyle,
    headerTintColor: 'lightgrey',
    headerStyle: {
      backgroundColor: 'rebeccapurple',
    },
  });
  const {deleteUser, user} = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const {language} = useContext(SystemContext);
  const fd = language == 'en' ? 'row-reverse' : 'row';
  const handleUpdate = () => {
    navigation.navigate('UserForm');
  };
  useEffect(() => {
    function loadUser() {
      setMobile(user.mobile);
      setName(user.name);
      setEmail(user.email);
    }
    loadUser();
  }, [user]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      enabled
      keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.container}>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>اسم المستخدم</Text>
            <Text style={styles.title}>{name}</Text>
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>الإيميل</Text>
            <Text style={styles.title}>{email}</Text>
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>رقم الموبايل</Text>
            <Text style={styles.title}>{mobile}</Text>
          </View>

          <View style={[styles.buttonContainer, {flexDirection: fd}]}>
            <TouchableOpacity onPress={() => handleUpdate()}>
              <View>
                <Text style={styles.save}>تعديل</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteUser()}>
              <View>
                <Text style={styles.save}> حذف </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
