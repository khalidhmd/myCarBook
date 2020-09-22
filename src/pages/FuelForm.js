import React, {useState, useContext} from 'react';
import styles from '../shared/styles';
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {addFuel} from '../data/storage';
import {FuelRecord} from '../data/models';
import {ActiveCarContext} from '../contexts/ActiveCarContext';
import {SystemContext} from '../contexts/SystemContext';
import HeaderRightButton from '../shared/components/HeaderRightButton';

export default function FuelForm({route, navigation}) {
  const {activeCar, setActiveCar} = useContext(ActiveCarContext);
  const date = new Date();

  const [quantity, setQuantity] = useState('');
  const [cost, setCost] = useState('');
  const [km, setKm] = useState('');
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
        pressHnadler={() => {
          handleUpdate(quantity, cost, km);
        }}
        iconName="checkmark-outline"
      />
    ),
  });

  const handleUpdate = (quantity, cost, km) => {
    const fuelRecord = new FuelRecord(
      date.toISOString().substring(0, 10),
      km,
      car.id,
      quantity,
      cost,
    );
    addFuel(fuelRecord);
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
            <Text style={styles.title}>
              {date.toISOString().substring(0, 10)}
            </Text>
          </View>

          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>كمية الوقود</Text>
            <TextInput
              style={styles.text}
              placeholder="عدد اللترات"
              value={String(quantity)}
              onChangeText={text => {
                setQuantity(parseInt(text));
              }}
              keyboardType="number-pad"
            />
          </View>

          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>المبلغ</Text>
            <TextInput
              style={styles.text}
              placeholder="المبلغ"
              value={String(cost)}
              onChangeText={text => {
                setCost(parseInt(text));
              }}
              keyboardType="number-pad"
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>العداد</Text>
            <TextInput
              style={styles.text}
              placeholder="العداد"
              value={String(km)}
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
