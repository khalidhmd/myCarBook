import React, {useState, useContext} from 'react';
import styles from '../shared/styles';
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {CarContext} from '../contexts/CarContext';
import {ActiveCarContext} from '../contexts/ActiveCarContext';
import {SystemContext} from '../contexts/SystemContext';
import HeaderRightButton from '../shared/components/HeaderRightButton';


export default function KmForm({route, navigation}) {
  const {updateCar} = useContext(CarContext);
  const {activeCar, setActiveCar} = useContext(ActiveCarContext);
    const date = new Date()
    const [km, setKm] = useState('')
  const car = {...activeCar};
  
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
        pressHnadler={
           () => {
                handleUpdate(km);
              }
        }
        iconName="checkmark-outline"
      />
    ),
  });

  

  const handleUpdate = km => {
      car.km = km
    updateCar(car);
    setActiveCar({...car});
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
        <View style={styles.container}>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>اسم السيارة</Text>
            <Text style={styles.title}>{car.name}</Text>
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>التاريخ</Text>
            <Text style={styles.title}>{`${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`}</Text>
          </View>
          
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>قراءة العداد</Text>
            <TextInput
              style={styles.text}
              placeholder="قراءة العداد"
              value={String(km)}
              onChangeText={text => {setKm(parseInt(text))}}
              keyboardType="number-pad"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
