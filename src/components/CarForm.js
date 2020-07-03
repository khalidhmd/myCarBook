import React, {useState} from 'react';

import {Car} from '../data/models';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

const cars = Car.loadCars();
const handleSave = () => {
  const user = new User(name, mobile, passwd);
  user.saveCars();
};

export default function UserForm() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(2020);
  const [color, setColor] = useState('');
  const [km, setKm] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.subForm}>
        <Text style={styles.title}>الماركة</Text>
        <TextInput
          style={styles.text}
          placeholder="الماركة"
          value={make}
          onChangeText={text => setMake(text)}
        />
      </View>
      <View style={styles.subForm}>
        <Text style={styles.title}>الموديل</Text>
        <TextInput
          style={styles.text}
          placeholder="الموديل"
          value={model}
          onChangeText={text => setModel(text)}
        />
      </View>
      <View style={styles.subForm}>
        <Text style={styles.title}>سنة الصنع</Text>
        <TextInput
          style={styles.text}
          placeholder="سنة الصنع"
          value={year}
          onChangeText={text => setYear(text)}
        />
      </View>
      <View style={styles.subForm}>
        <Text style={styles.title}>اللون</Text>
        <TextInput
          style={styles.text}
          placeholder="اللون"
          value={color}
          onChangeText={text => setColor(text)}
        />
      </View>
      <View style={styles.subForm}>
        <Text style={styles.title}>قراءة العداد</Text>
        <TextInput
          style={styles.text}
          placeholder="قراءة العداد"
          value={km}
          onChangeText={text => setKm(text)}
        />
      </View>
      <TouchableOpacity
        onPress={() => handleSave(make, model, year, color, km)}>
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
