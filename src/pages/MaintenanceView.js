import React, {useState, useEffect, useContext} from 'react';
import styles from '../shared/styles';
import {
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import {SystemContext} from '../contexts/SystemContext';
import {ActiveCarContext} from '../contexts/ActiveCarContext';
import {removeMaintenance, removeLastMaintenance} from '../data/storage';

export default function CarView({navigation, route}) {
  const {language} = useContext(SystemContext);
  const fd = language == 'en' ? 'row-reverse' : 'row';
  const {activeCar} = useContext(ActiveCarContext);
  const [maintenance, setMaintenance] = useState({...route.params.maintenance});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setMaintenance({...route.params.maintenance});
    });

    return unsubscribe;
  }, [navigation]);

  navigation.setOptions({
    title: 'عرض عملية صيانة',
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
          {/* <MenuOption onSelect={handleUpdate}>
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
          </MenuOption> */}

          <MenuOption onSelect={() => handleDelete(maintenance.id)}>
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
                حذف صيانة
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
      'هل تريد حذف الصيانة؟',
      [
        {
          text: 'لا',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'حذف',
          onPress: async () => {
            removeMaintenance(idx);
            removeLastMaintenance(maintenance);
            navigation.pop();
            navigation.navigate('CarView');
          },
        },
      ],
      {cancelable: false},
    );
  };

  // const handleUpdate = () => {
  //   navigation.navigate('CarForm', {
  //     mode: 'update',
  //     title: 'تعديل بيانات سيارة',
  //   });
  // };

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
            <View style={[styles.subForm, {flexDirection: fd}]}>
              <Text style={styles.title}>اسم السيارة</Text>
              <Text style={styles.title}>{activeCar.name}</Text>
            </View>
            <View style={[styles.subForm, {flexDirection: fd}]}>
              <Text style={styles.title}>التاريخ</Text>
              <Text style={styles.title}>{maintenance.date}</Text>
            </View>
            <View style={[styles.subForm, {flexDirection: fd}]}>
              <Text style={styles.title}>الصيانة</Text>
              <Text style={styles.title}>{maintenance.typeName}</Text>
            </View>
            <View style={[styles.subForm, {flexDirection: fd}]}>
              <Text style={styles.title}>مكان الصيانة</Text>
              <Text style={styles.title}>{maintenance.maker}</Text>
            </View>
            <View style={[styles.subForm, {flexDirection: fd}]}>
              <Text style={styles.title}>سعر قطع الغيار</Text>
              <Text style={styles.title}>{String(maintenance.vPrice)}</Text>
            </View>
            <View style={[styles.subForm, {flexDirection: fd}]}>
              <Text style={styles.title}>سعر المصنعية</Text>
              <Text style={styles.title}>{String(maintenance.mPrice)}</Text>
            </View>
            <View style={[styles.subForm, {flexDirection: fd}]}>
              <Text style={styles.title}>قراءة العداد</Text>
              <Text style={styles.title}>{String(maintenance.km)}</Text>
            </View>
            <View style={[styles.subForm, {flexDirection: fd}]}>
              <Text style={styles.title}>معدل كيلومتر</Text>
              <Text style={styles.title}>{String(maintenance.kmRate)}</Text>
            </View>
            <View style={[styles.subForm, {flexDirection: fd}]}>
              <Text style={styles.title}>معدل زمني بالشهر</Text>
              <Text style={styles.title}>{String(maintenance.timeRate)}</Text>
            </View>
            <View style={[styles.subForm, {flexDirection: fd}]}>
              <Text style={styles.title}>ملاحظات</Text>
              <Text style={styles.title}>{maintenance.notes}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
