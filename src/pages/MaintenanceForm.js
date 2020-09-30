import React, {useState, useContext, useEffect} from 'react';
import styles from '../shared/styles';
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {CarContext} from '../contexts/CarContext';
import {addMaintenance, getTypes} from '../data/storage';
import {Maintenance} from '../data/models';
import {ActiveCarContext} from '../contexts/ActiveCarContext';
import {SystemContext} from '../contexts/SystemContext';
import HeaderRightButton from '../shared/components/HeaderRightButton';

export default function MaintenanceForm({route, navigation}) {
  const {updateCar, cars} = useContext(CarContext);
  const {activeCar, setActiveCar} = useContext(ActiveCarContext);
  const date = new Date();
  const [types, setTypes] = useState([]);
  const [typeName, setTypeName] = useState('');
  const [maker, setMaker] = useState('');
  const [vPrice, setVPrice] = useState('');
  const [mPrice, setMPrice] = useState('');
  const [timeRate, setTimeRate] = useState('');
  const [kmRate, setKmRate] = useState('');
  const [notes, setNotes] = useState('');
  const [km, setKm] = useState(activeCar.km);
  const car = {...activeCar};

  const {language} = useContext(SystemContext);
  const fd = language == 'en' ? 'row-reverse' : 'row';

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const types = await getTypes();
      setTypes(types);
    });

    return unsubscribe;
  }, [navigation]);

  navigation.setOptions({
    title: route.params.title,
    headerTitleStyle: styles.headerTitleStyle,
    headerTintColor: 'whitesmoke',
    headerStyle: {
      backgroundColor: 'rebeccapurple',
    },
    headerRight: () => (
      <HeaderRightButton
        pressHnadler={handleSave}
        iconName="checkmark-outline"
      />
    ),
  });

  const handleSave = () => {
    const maintenance = new Maintenance(
      date.toISOString().substring(0, 10),
      maker,
      vPrice,
      mPrice,
      km,
      timeRate,
      kmRate,
      notes,
      car.id,
      typeName,
    );
    addMaintenance(maintenance);
    car.km = km;
    setActiveCar(car);
    updateCar(car);
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
            <Text style={styles.title}>نوع الصيانة</Text>
            <Picker
              mode="dropdown"
              selectedValue={typeName}
              style={styles.text}
              onValueChange={(itemValue, itemIndex) => {
                setTypeName(itemValue);
                setKmRate(types[itemIndex].kmRate);
                setTimeRate(types[itemIndex].timeRate);
              }}>
              {types.map(t => (
                <Picker.Item label={t.name} value={t.name} key={t.id} />
              ))}
            </Picker>
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>جهة الصيانة</Text>
            <TextInput
              style={styles.text}
              placeholder="جهة الصيانة"
              value={maker}
              onChangeText={text => {
                setMaker(text);
              }}
            />
          </View>

          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>سعر قطع الغيار</Text>
            <TextInput
              style={styles.text}
              placeholder="سعر قطع الغيار"
              value={String(vPrice)}
              onChangeText={text => {
                setVPrice(parseInt(text));
              }}
              keyboardType="number-pad"
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>سعر المصنعية</Text>
            <TextInput
              style={styles.text}
              placeholder="سعر المصنعية"
              value={String(mPrice)}
              onChangeText={text => {
                setMPrice(parseInt(text));
              }}
              keyboardType="number-pad"
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>قراءة العداد</Text>
            <TextInput
              style={styles.text}
              placeholder="قراءة العداد"
              value={String(km)}
              onChangeText={text => {
                setKm(parseInt(text));
              }}
              keyboardType="number-pad"
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>معدل كيلومتر</Text>
            <TextInput
              style={styles.text}
              placeholder="معدل كيلو متر"
              value={String(kmRate)}
              onChangeText={text => {
                setKmRate(parseInt(text));
              }}
              keyboardType="number-pad"
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>معدل زمني بالشهر</Text>
            <TextInput
              style={styles.text}
              placeholder="معدل زمني بالشهر"
              value={String(timeRate)}
              onChangeText={text => {
                setTimeRate(parseInt(text));
              }}
              keyboardType="number-pad"
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>ملاحظات</Text>
            <TextInput
              style={styles.text}
              placeholder="ملاحظات"
              value={notes}
              onChangeText={text => {
                setNotes(text);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
