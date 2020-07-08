import React, {useState, useEffect} from 'react';
import {deleteCar} from '../data/storage';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';

export default function CarView({navigation, route}) {
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
            await deleteCar(id);
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

  return (
    <View style={styles.container}>
      <View style={styles.subForm}>
        <Text style={styles.title}>الماركة</Text>
        <Text style={styles.title}>{car.make}</Text>
      </View>
      <View style={styles.subForm}>
        <Text style={styles.title}>الموديل</Text>
        <Text style={styles.title}>{car.model}</Text>
      </View>
      <View style={styles.subForm}>
        <Text style={styles.title}>سنة الصنع</Text>
        <Text style={styles.title}>{car.year}</Text>
      </View>
      <View style={styles.subForm}>
        <Text style={styles.title}>اللون</Text>
        <Text style={styles.title}>{car.color}</Text>
      </View>
      <View style={styles.subForm}>
        <Text style={styles.title}>قراءة العداد</Text>
        <Text style={styles.title}>{car.km}</Text>
      </View>
      <View style={styles.buttonContainer}>
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
