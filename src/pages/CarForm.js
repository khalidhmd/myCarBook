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
import Icon from 'react-native-vector-icons/Ionicons';

import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';

export default function CarForm({route, navigation}) {
  const {addCar, updateCar} = useContext(CarContext);
  const {setActiveCar, activeCar} = useContext(ActiveCarContext);

  const car = route.params.mode === 'add' ? {} : activeCar;
  const [name, setName] = useState(car.name);
  const [make, setMake] = useState(car.make);
  const [model, setModel] = useState(car.model);
  const [year, setYear] = useState(car.year || 2000);
  const [color, setColor] = useState(car.color);
  const [km, setKm] = useState(car.km || 0);
  const [id, setId] = useState(car.id);
  const [imgURL, setImgURL] = useState(car.imgURL);

  const {language} = useContext(SystemContext);
  const fd = language == 'en' ? 'row-reverse' : 'row';

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
      headerTitleStyle: styles.headerTitleStyle,
      headerTintColor: 'lightgrey',
      headerStyle: {
        backgroundColor: 'rebeccapurple',
      },
    });
  }, [navigation]);

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
  const handleAdd = (name, make, model, imgURL, y, color, k) => {
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
    const car = new Car(name, make, model, imgURL, year, color, km);
    addCar(car);
    setActiveCar({...car});
    navigation.popToTop();
  };

  const handleUpdate = car => {
    updateCar(car);
    setActiveCar({...car});
    navigation.pop();
    navigation.navigate('CarView', {car});
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      enabled
      keyboardVerticalOffset={100}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
                إضغط هنا لاضافة صورة أو اضغط على الصورة لاحقا لتغييرها
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
              onChangeText={text => setYear(text)}
              keyboardType="number-pad"
            />
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
              onChangeText={text => setKm(text)}
              keyboardType="number-pad"
            />
          </View>
          <View style={[styles.buttonContainer, {flexDirection: fd}]}>
            {route.params.mode === 'add' ? (
              <TouchableOpacity
                onPress={() =>
                  handleAdd(name, make, model, imgURL, year, color, km)
                }>
                <View style={styles.buttonView}>
                  <Icon name="save-outline" size={22} color="rebeccapurple" />
                  <Text style={styles.save}>حفظ</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  handleUpdate({
                    name,
                    make,
                    model,
                    imgURL,
                    year,
                    color,
                    km,
                    id,
                  })
                }>
                <View style={styles.buttonView}>
                  <Icon name="save-outline" size={22} color="rebeccapurple" />
                  <Text style={styles.save}>حفظ</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
