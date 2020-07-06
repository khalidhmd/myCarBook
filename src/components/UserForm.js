import React, {useState, useEffect} from 'react';

import {User} from '../data/models';
import {getUser, saveUser, deleteUser} from '../data/storage';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

const handleSave = async (name, mobile, passwd) => {
  const user = new User(name, mobile, passwd);
  await saveUser(user);
};

const handleDelete = async () => {
  await deleteUser();
};

export default function UserForm() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [passwd, setPasswd] = useState('');

  useEffect(() => {
    async function loadUser() {
      const user = await getUser();
      setMobile(user.mobile);
      setName(user.name);
      setPasswd(user.passwd);
    }
    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.subForm}>
        <Text style={styles.title}>اسم المستخدم</Text>
        <TextInput
          style={styles.text}
          placeholder="اسم المستخدم"
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={styles.subForm}>
        <Text style={styles.title}>رقم الموبايل</Text>
        <TextInput
          style={styles.text}
          placeholder="رقم الموبايل"
          value={mobile}
          onChangeText={text => setMobile(text)}
        />
      </View>
      <View style={styles.subForm}>
        <Text style={styles.title}>رمز المرور</Text>
        <TextInput
          style={styles.text}
          placeholder="رمز المرور"
          value={passwd}
          onChangeText={text => setPasswd(text)}
        />
      </View>
      <TouchableOpacity onPress={() => handleSave(name, mobile, passwd)}>
        <View>
          <Text style={styles.save}>حفظ</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete()}>
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
