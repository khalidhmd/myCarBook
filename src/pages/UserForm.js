import React, {useState, useEffect, useContext} from 'react';
var uuid = require('react-native-uuid');
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../shared/styles';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {UserContext} from '../contexts/UserContext';
import {SystemContext} from '../contexts/SystemContext';

export default function UserForm({navigation}) {
  navigation.setOptions({
    title: 'بيانات المستخدم',
    headerTitleStyle: {
      alignSelf: 'center',
      color: 'lightgrey',
      fontSize: 24,
      fontFamily: 'Almarai-Regular',
    },
    headerTintColor: 'lightgrey',
    headerStyle: {
      backgroundColor: 'rebeccapurple',
    },
  });
  const {deleteUser, handleSaveUser, user} = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [passwd, setPasswd] = useState('');
  const {language} = useContext(SystemContext);
  const fd = language == 'en' ? 'row-reverse' : 'row';

  useEffect(() => {
    function loadUser() {
      setMobile(user.mobile);
      setName(user.name);
      setEmail(user.email);
      setPasswd(user.passwd);
    }
    loadUser();
  }, [user]);
  const handleSave = user => {
    handleSaveUser(user);
    navigation.pop();
  };
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
            <TextInput
              style={styles.text}
              placeholder="اسم المستخدم"
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>الايميل</Text>
            <TextInput
              style={styles.text}
              placeholder="الايميل"
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>رقم الموبايل</Text>
            <TextInput
              style={styles.text}
              placeholder="رقم الموبايل"
              value={mobile}
              onChangeText={text => setMobile(text)}
              keyboardType="phone-pad"
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>رمز المرور</Text>
            <TextInput
              style={styles.text}
              placeholder="رمز المرور"
              value={passwd}
              onChangeText={text => setPasswd(text)}
              secureTextEntry={true}
            />
          </View>
          <View style={[styles.buttonContainer, {flexDirection: fd}]}>
            <TouchableOpacity
              onPress={() =>
                handleSave({name, email, mobile, passwd, id: uuid.v4()})
              }>
              <View>
                <Text style={styles.save}>حفظ</Text>
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
