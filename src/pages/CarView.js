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
import Icon from 'react-native-vector-icons/Ionicons';
import {CarContext} from '../contexts/CarContext';
import {SystemContext} from '../contexts/SystemContext';
import {ActiveCarContext} from '../contexts/ActiveCarContext';
import CustomButton from '../shared/components/CustomButton';

export default function CarView({navigation}) {
  const {removeCar} = useContext(CarContext);
  const {language} = useContext(SystemContext);
  const fd = language == 'en' ? 'row-reverse' : 'row';
  const {setActiveCar, activeCar} = useContext(ActiveCarContext);
  const [car, setCar] = useState({...activeCar});
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setCar({...activeCar});
    });

    return unsubscribe;
  }, [navigation]);

  navigation.setOptions({
    title: 'عرض بيانات سيارة',
    headerTitleStyle: styles.headerTitleStyle,
    headerTintColor: 'lightgrey',
    headerStyle: {
      backgroundColor: 'rebeccapurple',
    },
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          setShow(!show);
        }}>
        <Icon
          name="ellipsis-vertical-outline"
          size={30}
          color="white"
        />
      </TouchableOpacity>
    ),
  });


  const handleDelete = idx => {
    Alert.alert(
      'حذف',
      'هل تريد حذف بيانات السيارة؟',
      [
        {
          text: 'لا',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'حذف',
          onPress: async () => {
            removeCar(idx);
            setActiveCar({});
            navigation.pop();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleUpdate = () => {
    setShow(false);
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
      {show ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 3,
            zIndex: 1,
            backgroundColor: 'lightgrey',
            padding:8,
            borderRadius:10
          }}>
          <CustomButton
            title="تعديل"
            iconName="create-outline"
            pressHandler={handleUpdate}
          />
          <CustomButton
            title="حذف"
            iconName="trash-outline"
            pressHandler={() => {
              handleDelete(car.id);
            }}
          />
        </View>
      ) : null}

      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
