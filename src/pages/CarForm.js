import React, {useState, useContext} from 'react';
import {Car} from '../data/models';
import styles from '../shared/styles';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {CarContext} from '../contexts/CarContext';
import {ActiveCarContext} from '../contexts/ActiveCarContext';
import {SystemContext} from '../contexts/SystemContext';
import HeaderRightButton from '../shared/components/HeaderRightButton';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CarForm({route, navigation}) {
  const {addCar, updateCar} = useContext(CarContext);
  const {activeCar, setActiveCar} = useContext(ActiveCarContext);
  const today = new Date();
  const mode = route.params.mode;
  const car = mode === 'add' ? {} : activeCar;
  const [name, setName] = useState(car.name);
  const [make, setMake] = useState(car.make);
  const [model, setModel] = useState(car.model);
  const [year, setYear] = useState(
    mode === 'add' ? today.getFullYear() : car.year,
  );
  const [color, setColor] = useState(car.color);
  const [km, setKm] = useState(car.km || 0);
  const [id, setId] = useState(car.id);
  const [imgURL, setImgURL] = useState(car.imgURL);
  const [lExpiry, setLExpiry] = useState(
    mode === 'add' ? today.toISOString().substring(0, 10) : car.lExpiry,
  );
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
        pressHnadler={
          route.params.mode === 'add'
            ? () => {
                handleAdd(name, make, model, imgURL, year, color, km, lExpiry);
              }
            : () => {
                handleUpdate({
                  name,
                  make,
                  model,
                  imgURL,
                  year,
                  color,
                  km,
                  lExpiry,
                  id,
                });
              }
        }
        iconName="checkmark-outline"
      />
    ),
  });

  const imageGalleryLaunch = async () => {
    const g = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );

    if (!g) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'EgyCarBook file Permission',
            message:
              'EgyCarBook App needs access to your files ' +
              'so you can choose car photo.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
          return;
        }
      } catch (err) {
        console.warn(err);
      }
    }
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, res => {
      if (res.didCancel) {
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        alert(res.customButton);
      } else {
        RNFS.exists(RNFS.DocumentDirectoryPath + '/photos')
          .then(found => {
            if (!found)
              return RNFS.mkdir(RNFS.DocumentDirectoryPath + '/photos');
          })
          .then(() => {
            return RNFS.copyFile(
              res.path,
              RNFS.DocumentDirectoryPath + '/photos/' + res.fileName,
            );
          })
          .then(() => {
            setImgURL(RNFS.DocumentDirectoryPath + '/photos/' + res.fileName);
          });
      }
    });
  };
  const handleAdd = (name, make, model, imgURL, y, color, k, lExpiry) => {
    if (
      name == '' ||
      make == '' ||
      model == '' ||
      y == '' ||
      y == 0 ||
      color == '' ||
      k == '' ||
      name == null ||
      make == null ||
      model == null ||
      y == null ||
      color == null ||
      k == null ||
      k == 0
    ) {
      Alert.alert('خطأ', 'يرجى اكمال البيانات');
      return;
    }
    const year = parseInt(y);
    const km = parseInt(k);
    const car = new Car(name, make, model, imgURL, year, color, km, lExpiry);
    addCar(car);
    setActiveCar({...car});
    navigation.popToTop();
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(lExpiry);
    setShow(false);
    setLExpiry(currentDate.toISOString().substring(0, 10));
  };

  const datePress = () => {
    setShow(true);
  };

  const handleUpdate = car => {
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
        {show && <DateTimePicker value={today} onChange={onDateChange} />}
        <View style={styles.container}>
          <TouchableOpacity onPress={imageGalleryLaunch}>
            {!!imgURL ? (
              <Image
                style={styles.imgForm}
                source={{uri: 'file://' + imgURL}}
              />
            ) : (
              <Text
                style={{
                  width: 200,
                  fontSize: 18,
                  textAlign: 'center',
                  marginTop: 10,
                  backgroundColor: 'lightblue',
                  borderRadius: 10,
                  fontFamily: 'Almarai-Regular',
                }}>
                إضغط هنا لاضافة صورة
              </Text>
            )}
          </TouchableOpacity>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>اسم المركبة</Text>
            <TextInput
              style={styles.text}
              placeholder="اسم السيارة"
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>الماركة</Text>
            <TextInput
              style={styles.text}
              placeholder="الماركة"
              value={make}
              onChangeText={text => setMake(text)}
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>الموديل</Text>
            <TextInput
              style={styles.text}
              placeholder="الموديل"
              value={model}
              onChangeText={text => setModel(text)}
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>سنة الصنع</Text>
            <TextInput
              style={styles.text}
              placeholder="سنة الصنع"
              value={String(year)}
              onChangeText={text => setYear(parseInt(text))}
              keyboardType="number-pad"
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>نهاية الترخيص</Text>
            <TouchableOpacity onPress={datePress}>
              <Text style={[styles.text, {paddingVertical: 10}]}>
                {lExpiry}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>اللون</Text>
            <TextInput
              style={styles.text}
              placeholder="اللون"
              value={color}
              onChangeText={text => setColor(text)}
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>قراءة العداد</Text>
            <TextInput
              style={styles.text}
              placeholder="قراءة العداد"
              value={String(km)}
              onChangeText={text => setKm(parseInt(text))}
              keyboardType="number-pad"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
