import React, {useState, useEffect, useContext} from 'react';
import styles from '../shared/styles';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
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
    navigation.pop();
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      enabled
      keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.imgForm}
            source={{uri: 'file://' + car.imgURL}}
          />
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>الاسم</Text>
            <Text style={styles.title}>{car.name}</Text>
          </View>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
