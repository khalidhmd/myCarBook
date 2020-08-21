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
import {ActiveCarContext} from '../contexts/ActiveCarContext';

export default function CarView({navigation}) {
  const {removeCar} = useContext(CarContext);
  const {language} = useContext(SystemContext);
  const fd = language == 'en' ? 'row-reverse' : 'row';
  const {setActiveCar, activeCar} = useContext(ActiveCarContext);
  const [car, setCar] = useState({...activeCar});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setCar({...activeCar});
    });

    return unsubscribe;
  }, [navigation]);

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
            setActiveCar({});
            navigation.pop();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleUpdate = () => {
    navigation.pop();
    navigation.navigate('CarForm', {
      mode: 'update',
      title: 'تعديل بيانات سيارة',
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
          {!!car.imgURL ? (
            <Image
              style={styles.imgForm}
              source={{uri: 'file://' + car.imgURL}}
            />
          ) : null}

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
