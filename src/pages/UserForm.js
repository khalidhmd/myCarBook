import React, {useState, useEffect, useContext} from 'react';
var uuid = require('react-native-uuid');
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {UserContext} from '../contexts/UserContext';
import {SystemContext} from '../contexts/SystemContext';

export default function UserForm({navigation}) {
  navigation.setOptions({
    title: 'بيانات المستخدم',
    headerTitleStyle: {
      alignSelf: 'center',
      fontWeight: 'bold',
      color: 'lightgrey',
      fontSize: 24,
    },
    headerStyle: {
      backgroundColor: 'rebeccapurple',
    },
  });
  const {deleteUser, handleSaveUser, user} = useContext(UserContext);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [passwd, setPasswd] = useState('');
  const {language} = useContext(SystemContext);
  const fd = language == 'en' ? 'row-reverse' : 'row';

  useEffect(() => {
    function loadUser() {
      setMobile(user.mobile);
      setName(user.name);
      setPasswd(user.passwd);
    }
    loadUser();
  }, []);

  return (
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
        />
      </View>
      <View style={[styles.buttonContainer, {flexDirection: fd}]}>
        <TouchableOpacity
          onPress={() => handleSaveUser({name, mobile, passwd, id: uuid.v4()})}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subForm: {
    flexDirection: 'row-reverse',
    width: '95%',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    width: 140,
  },
  text: {
    fontSize: 20,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    textAlign: 'right',
    width: 180,
  },
  buttonContainer: {
    width: '95%',
    justifyContent: 'space-evenly',
  },
  save: {
    marginTop: 15,
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    width: 100,
    color: 'white',
    backgroundColor: 'darkblue',
    borderRadius: 7,
    paddingVertical: 5,
  },
});
