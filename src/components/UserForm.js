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

export default function UserForm() {
  const {deleteUser, saveUser, user} = useContext(UserContext);
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
      <TouchableOpacity
        onPress={() => saveUser({name, mobile, passwd, id: uuid.v4()})}>
        <View>
          <Text style={styles.save}>حفظ</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteUser()}>
        <View>
          <Text style={styles.save}> حذف المستخدم</Text>
        </View>
      </TouchableOpacity>
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
    width: '90%',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    alignSelf: 'center',
    width: 150,
  },
  text: {
    fontSize: 24,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    textAlign: 'right',
    width: 200,
  },
  save: {
    marginTop: 20,
    fontSize: 25,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 5,
    width: 250,
    color: 'white',
    backgroundColor: 'darkblue',
    borderRadius: 10,
    paddingVertical: 10,
  },
});
