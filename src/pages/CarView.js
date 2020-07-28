import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {CarContext} from '../contexts/CarContext';
import {SystemContext} from '../contexts/SystemContext';

export default function CarView({navigation, route}) {
  const {removeCar} = useContext(CarContext);
  const {language} = useContext(SystemContext);
  const fd = language == 'en' ? 'row-reverse' : 'row';

  const [car, setCar] = useState({...route.params.car});
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setCar({...route.params.car});
    });

    return unsubscribe;
  }, [navigation, route]);

  navigation.setOptions({
    title: 'عرض بيانات سيارة',
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
  const handleDelete = id => {
    Alert.alert(
      'حذف',
      'هل تريد حذف بيانات السيارة؟',
      [
        {
          text: 'لا',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'حذف',
          onPress: async () => {
            removeCar(id);
            navigation.pop();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleUpdate = car => {
    navigation.navigate('CarForm', {
      mode: 'update',
      title: 'تعديل بيانات سيارة',
      car,
    });
  };

  const handleAddKm = car => {
    navigation.navigate('KmForm', {
      title: 'تسجيل قراءة العداد',
      car,
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.subForm, {flexDirection: fd}]}>
        <Text style={styles.title}>الماركة</Text>
        <Text style={styles.title}>{car.make}</Text>
      </View>
      <View style={[styles.subForm, {flexDirection: fd}]}>
        <Text style={styles.title}>الموديل</Text>
        <Text style={styles.title}>{car.model}</Text>
      </View>
      <View style={[styles.subForm, {flexDirection: fd}]}>
        <Text style={styles.title}>سنة الصنع</Text>
        <Text style={styles.title}>{car.year}</Text>
      </View>
      <View style={[styles.subForm, {flexDirection: fd}]}>
        <Text style={styles.title}>اللون</Text>
        <Text style={styles.title}>{car.color}</Text>
      </View>
      <View style={[styles.subForm, {flexDirection: fd}]}>
        <Text style={styles.title}>قراءة العداد</Text>
        <Text style={styles.title}>{car.km}</Text>
      </View>
      <View style={[styles.buttonContainer, {flexDirection: fd}]}>
        <TouchableOpacity onPress={() => handleUpdate(car)}>
          <View>
            <Text style={styles.save}>تعديل</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(car.id)}>
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
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subForm: {
    width: '95%',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    width: 140,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    textAlign: 'auto',
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
