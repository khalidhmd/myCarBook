import React, {useState, useContext} from 'react';
import styles from '../shared/styles';
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {addKms} from '../data/storage';
import {KmRecord} from '../data/models';
import {CarContext} from '../contexts/CarContext';
import {ActiveCarContext} from '../contexts/ActiveCarContext';
import {SystemContext} from '../contexts/SystemContext';
import HeaderRightButton from '../shared/components/HeaderRightButton';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function KmForm({route, navigation}) {
  const {updateCar} = useContext(CarContext);
  const {activeCar, setActiveCar} = useContext(ActiveCarContext);
  const [date, setDate] = useState(new Date());

  const [km, setKm] = useState('');
  const car = {...activeCar};
  const [show, setShow] = useState(false);

  const {language} = useContext(SystemContext);
  const fd = language == 'en' ? 'row-reverse' : 'row';

  navigation.setOptions({
    title: route.params.title,
    headerTitleStyle: styles.headerTitleStyle,
    headerTintColor: 'whitesmoke',
    headerStyle: {
      backgroundColor: 'rebeccapurple',
    },
    headerRight: () => (
      <HeaderRightButton
        pressHnadler={() => {
          handleUpdate(km);
        }}
        iconName="checkmark-outline"
      />
    ),
  });

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const datePress = () => {
    setShow(true);
  };

  const handleUpdate = km => {
    car.km = km;
    updateCar(car);
    setActiveCar({...car});
    const kmRecord = new KmRecord(
      date.toISOString().substring(0, 10),
      km,
      car.id,
    );
    addKms(kmRecord);
    navigation.popToTop();
    navigation.navigate('CarView', {car});
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      enabled
      keyboardVerticalOffset={100}>
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        {show && <DateTimePicker value={date} onChange={onDateChange} />}
        <View style={styles.container}>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>اسم السيارة</Text>
            <Text style={styles.title}>{car.name}</Text>
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>التاريخ</Text>
            <TouchableOpacity onPress={datePress}>
              <Text style={[styles.text, {paddingVertical: 10}]}>
                {date.toISOString().substring(0, 10)}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>قراءة العداد</Text>
            <TextInput
              style={styles.text}
              placeholder="قراءة العداد"
              value={km ? String(km) : km}
              onChangeText={text => {
                setKm(parseInt(text));
              }}
              keyboardType="number-pad"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
