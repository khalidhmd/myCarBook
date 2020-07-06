import React, {useState} from 'react';

import {Car} from '../data/models';
import {addCar, deleteCar, updateCar} from '../data/storage';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

export default function CarForm(props) {
  const car = {...props.car};
  const [make, setMake] = useState(car.make);
  const [model, setModel] = useState(car.model);
  const [year, setYear] = useState(car.year);
  const [color, setColor] = useState(car.color);
  const [km, setKm] = useState(car.km);
  const [id, setId] = useState(car.id);

  const handleAdd = (make, model, year, color, km) => {
    const car = new Car(make, model, year, color, km);
    addCar(car);

    setMake('');
    setModel('');
    setYear(2020);
    setColor('');
    setKm(0);
    setId(car.id);
  };

  const handleDelete = id => {
    deleteCar(id);

    setMake('');
    setModel('');
    setYear(2020);
    setColor('');
    setKm(0);
    setId('');
  };

  const handleUpdate = car => {
    updateCar(car);
  };

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
        <Text style={styles.text}>{km}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleAdd(make, model, year, color, km)}>
          <View>
            <Text style={[styles.save]}>إضافة</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleUpdate({make, model, year, color, km, id})}>
          <View>
            <Text style={styles.save}>تعديل</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(id)}>
          <View>
            <Text style={styles.save}>حذف</Text>
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
    width: '90%',
    marginBottom: 5,
  },
  title: {
    fontSize: 22,
    alignSelf: 'center',
    width: 120,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 22,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    textAlign: 'auto',
    width: 180,
  },
  buttonContainer: {
    flexDirection: 'row-reverse',
    width: '90%',
    justifyContent: 'space-evenly',
  },
  save: {
    marginTop: 15,
    fontSize: 24,
    alignSelf: 'center',
    textAlign: 'center',
    width: 80,
    color: 'white',
    backgroundColor: 'darkblue',
    borderRadius: 7,
    paddingVertical: 5,
  },
});
