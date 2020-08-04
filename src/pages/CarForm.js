import React, {useState, useContext} from 'react';
import {Car} from '../data/models';
import styles from '../shared/styles';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {CarContext} from '../contexts/CarContext';
import {SystemContext} from '../contexts/SystemContext';

export default function CarForm({route, navigation}) {
  const {addCar, updateCar} = useContext(CarContext);
  const car = route.params.car || {};
  const [name, setName] = useState(car.name);
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
        color: 'lightgrey',
        fontSize: 24,
      },
      headerTintColor: 'lightgrey',
      headerStyle: {
        backgroundColor: 'rebeccapurple',
      },
    });
  }, [navigation]);

  const handleAdd = (name, make, model, y, color, k) => {
    if (
      name == '' ||
      make == '' ||
      model == '' ||
      y == '' ||
      y == 0 ||
      color == '' ||
      k == '' ||
      name == null ||
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
    const car = new Car(name, make, model, year, color, km);
    addCar(car);

    navigation.pop();
  };

  const handleUpdate = car => {
    updateCar(car);
    navigation.pop();
    navigation.navigate('CarView', {car});
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      enabled
      keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={[styles.subForm, {flexDirection: fd}]}>
          <Text style={styles.title}>اسم المركبة</Text>
          <TextInput
            style={styles.text}
            placeholder="اسم المركبة"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
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
              onPress={() => handleAdd(name, make, model, year, color, km)}>
              <View>
                <Text style={[styles.save]}>حفظ</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                handleUpdate({name, make, model, year, color, km, id})
              }>
              <View>
                <Text style={styles.save}>حفظ</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
