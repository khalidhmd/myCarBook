import React, {useState, useContext} from 'react';
import {Car} from '../data/models';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {CarContext} from '../contexts/CarContext';
import {SystemContext} from '../contexts/SystemContext';

export default function CarForm({route, navigation}) {
  const {addCar, updateCar} = useContext(CarContext);
  const car = route.params.car || {};
  const [make, setMake] = useState(car.make);
  const [model, setModel] = useState(car.model);
  const [year, setYear] = useState(car.year || 2000);
  const [color, setColor] = useState(car.color);
  const [km, setKm] = useState(car.km || 0);
  const [id, setId] = useState(car.id);
  const {language} = useContext(SystemContext);
  const fd = language == 'en' ? 'row-reverse' : 'row';
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
      headerTitleStyle: {
        alignSelf: 'center',
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  const handleAdd = (make, model, y, color, k) => {
    if (
      make == '' ||
      model == '' ||
      y == '' ||
      y == 0 ||
      color == '' ||
      k == '' ||
      make == null ||
      model == null ||
      y == null ||
      color == null ||
      k == null ||
      k == 0
    ) {
      Alert.alert('خطأ', 'يرجى اكمال البيانات');
      return;
    }
    const year = parseInt(y);
    const km = parseInt(k);
    const car = new Car(make, model, year, color, km);
    addCar(car);

    setMake('');
    setModel('');
    setYear('');
    setColor('');
    setKm('');
  };

  const handleUpdate = car => {
    updateCar(car);
    navigation.navigate('CarView', {car});
  };

  return (
    <View style={styles.container}>
      <View style={[styles.subForm, {flexDirection: fd}]}>
        <Text style={styles.title}>الماركة</Text>
        <TextInput
          style={styles.text}
          placeholder="الماركة"
          value={make}
          onChangeText={text => setMake(text)}
        />
      </View>
      <View style={[styles.subForm, {flexDirection: fd}]}>
        <Text style={styles.title}>الموديل</Text>
        <TextInput
          style={styles.text}
          placeholder="الموديل"
          value={model}
          onChangeText={text => setModel(text)}
        />
      </View>
      <View style={[styles.subForm, {flexDirection: fd}]}>
        <Text style={styles.title}>سنة الصنع</Text>
        <TextInput
          style={styles.text}
          placeholder="سنة الصنع"
          value={String(year)}
          onChangeText={text => setYear(text)}
          keyboardType="number-pad"
        />
      </View>
      <View style={[styles.subForm, {flexDirection: fd}]}>
        <Text style={styles.title}>اللون</Text>
        <TextInput
          style={styles.text}
          placeholder="اللون"
          value={color}
          onChangeText={text => setColor(text)}
        />
      </View>
      <View style={[styles.subForm, {flexDirection: fd}]}>
        <Text style={styles.title}>قراءة العداد</Text>
        <TextInput
          style={styles.text}
          placeholder="قراءة العداد"
          value={String(km)}
          onChangeText={text => setKm(text)}
          keyboardType="number-pad"
        />
      </View>
      <View style={[styles.buttonContainer, {flexDirection: fd}]}>
        {route.params.mode === 'add' ? (
          <TouchableOpacity
            onPress={() => handleAdd(make, model, year, color, km)}>
            <View>
              <Text style={[styles.save]}>حفظ</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleUpdate({make, model, year, color, km, id})}>
            <View>
              <Text style={styles.save}>حفظ</Text>
            </View>
          </TouchableOpacity>
        )}
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
