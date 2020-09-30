import React, {useState, useEffect, useContext} from 'react';
import styles from '../shared/styles';
import {
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import {CarContext} from '../contexts/CarContext';
import {SystemContext} from '../contexts/SystemContext';
import {ActiveCarContext} from '../contexts/ActiveCarContext';

export default function CarView({navigation, route}) {
  const {removeCar} = useContext(CarContext);
  const {language} = useContext(SystemContext);
  const fd = language == 'en' ? 'row-reverse' : 'row';
  const {setActiveCar, activeCar} = useContext(ActiveCarContext);
  const [car, setCar] = useState({...route.params.car});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setCar({...route.params.car});
    });

    return unsubscribe;
  }, [navigation]);

  navigation.setOptions({
    title: car.name,
    headerTitleStyle: styles.headerTitleStyle,
    headerTintColor: 'lightgrey',
    headerStyle: {
      backgroundColor: 'rebeccapurple',
    },
    headerRight: () => (
      <Menu>
        <MenuTrigger>
          <Icon name="ellipsis-vertical" size={24} color="white" />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={handleUpdate}>
            <View
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 20, fontFamily: 'Almarai-Regular'}}>
                تعديل بيانات
              </Text>
              <Icon name="create-outline" size={24} />
            </View>
          </MenuOption>
          <MenuOption onSelect={handleKm}>
            <View
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 20, fontFamily: 'Almarai-Regular'}}>
                تسجيل العداد
              </Text>
              <Icon name="speedometer-outline" size={24} />
            </View>
          </MenuOption>
          <MenuOption onSelect={() => navigation.navigate('KmRecords')}>
            <View
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 20, fontFamily: 'Almarai-Regular'}}>
                بيان كيلومتر
              </Text>
              <Icon name="speedometer-outline" size={24} color="#555" />
            </View>
          </MenuOption>
          <MenuOption onSelect={handleFuel}>
            <View
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 20, fontFamily: 'Almarai-Regular'}}>
                تسجيل وقود
              </Text>
              <FAIcon name="gas-pump" size={24} color="#555" />
            </View>
          </MenuOption>
          <MenuOption onSelect={() => navigation.navigate('FuelRecords')}>
            <View
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 20, fontFamily: 'Almarai-Regular'}}>
                بيان وقود
              </Text>
              <FAIcon name="gas-pump" size={24} color="#555" />
            </View>
          </MenuOption>
          <MenuOption onSelect={handleMaintenance}>
            <View
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 20, fontFamily: 'Almarai-Regular'}}>
                تسجيل صيانة
              </Text>
              <Icon name="construct-outline" size={24} color="#555" />
            </View>
          </MenuOption>
          <MenuOption
            onSelect={() => navigation.navigate('MaintenanceRecords')}>
            <View
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 20, fontFamily: 'Almarai-Regular'}}>
                بيان صيانات
              </Text>
              <Icon name="construct-outline" size={24} color="#555" />
            </View>
          </MenuOption>
          <MenuOption onSelect={() => handleDelete(car.id)}>
            <View
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 20,
                  fontFamily: 'Almarai-Regular',
                }}>
                حذف سيارة
              </Text>
              <Icon name="trash-outline" size={24} color="red" />
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
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
    navigation.navigate('CarForm', {
      mode: 'update',
      title: 'تعديل بيانات سيارة',
    });
  };

  const handleFuel = () => {
    navigation.navigate('FuelForm', {
      title: 'تسجيل وقود',
    });
  };

  const handleMaintenance = () => {
    navigation.navigate('MaintenanceForm', {
      title: 'تسجيل صيانة',
    });
  };

  const handleKm = () => {
    navigation.navigate('KmForm', {
      title: 'تسجيل عداد كم',
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      enabled
      keyboardVerticalOffset={100}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}>
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
      </View>
    </KeyboardAvoidingView>
  );
}
