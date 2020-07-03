import React, {useState} from 'react';

import {User} from '../data/models';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

const handleSave = (name, mobile, passwd) => {
  const user = new User(name, mobile, passwd);
  user.saveUser();
};

export default function UserForm() {
  const user = User.loadUser();
  // console.log(user);
  const [name, setName] = useState(user.name);
  const [mobile, setMobile] = useState(user.mobile);
  const [passwd, setPasswd] = useState(user.passwd);

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
    marginBottom: 7,
  },
  title: {
    fontSize: 24,
    alignSelf: 'center',
    left: 'auto',
  },
  text: {
    fontSize: 24,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    textAlign: 'auto',
    left: 'auto',
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
